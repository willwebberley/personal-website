---
title: "Kubernetes Cluster: Essentials"
---

This note documents the set-up of a k8s cluster from scratch, including ingress and load-balanced TLS support for web applications. It's mainly for myself to revisit and reference later on. The result of this note is not (quite) production-grade, and additional features (e.g. firewalls/logging/backups) should be enabled to improve its robustness.

Several cloud providers offer managed k8s services (including [Amazon EKS](https://aws.amazon.com/eks/), [GKE](https://cloud.google.com/kubernetes-engine/), [Digital Ocean](https://www.digitalocean.com/products/kubernetes/), etc.). Whilst these would be recommended for sensitive or production workloads, I wanted to create my own provider-independent cluster in order to understand the ins and outs.

## Infrastructure

Create the underlying infrastructure for the cluster by provisioning at least two new instances - all with at least 2GB memory and 2 CPUs. I used the latest Ubuntu LTS.

One of the new instances (`kube1`) will be the "control" node, and the others (`kube2`+) will be the "worker" nodes. In this scenario the "control plane" is made up of just one node - `kube1`.

> In larger clusters the control plane can be made to be highly available by using multiple control nodes in different availability zones.

Enable private networking between the nodes and ensure they can all access the internet using a public IP or through another interface (e.g. a NAT). If you use firewalls ensure the nodes can [communicate with each other via their private IPs](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/).

## Dependencies

On all nodes (control and workers), install Docker and k8s binaries:

* Add Google apt keys: `wget -qO - https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -`
* Add Google repo: `add-apt-repository ‘deb http://apt.kubernetes.io/ kubernetes-bionic main'`
* Update local repos: `apt update`
* Install docker.io, kubelet, and kubeadm: `apt install docker.io kubelet kubeadm`

On the control node only (`kube1`) also:

* Install kubectl: `apt install kubectl`

## Set-up the cluster

On the control node (`kube1`) prepare the cluster:

* As root, initialise the cluster: `kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=10.131.106.38`
  * Replace apiserver-advertise-address with the private IP for the master node
  * Setting `--pod-network-cidr` allows Flannel (the CNI plugin we're using here) to later allocate IP addresses to pods in your cluster from this range
* Create a new user to manage kubernetes: `useradd kubeuser`
* Create a new `.kube` directory: `mkdir /home/kubeuser/.kube && chown kubeuser:kubeuser /home/kubeuser/.kube`
* Copy in the default config file: `cp /etc/kubernetes/admin.conf /home/kubeuser/.kube/config && chown kubeuser:kubeuser /home/kubeuser/.kube/config`
* As the kubeuser user, install the Flannel network fabric by apply the appropriate YAML: `kubectl apply -f kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml`
* Finally, back as root, get and copy the kubernetes join command: `kubeadm token create --print-join-command`

Now join the worker nodes to the new cluster:

* As root, copy and paste and run the output from the last command on the control node on each worker node.

After a few minutes `kubectl get nodes` (as the `kubeuser` user on the control node) should list the other nodes in the cluster.

From now on, all `kubectl` commands should be issued by `kubeuser` on the control node, and all `kubeadm` commands by `root` on the control or worker nodes.

At this point you have a working cluster ready to create pods, deployments and services. The next sections go on to set up the cluster to allow exposing, securing, and load-balancing services for access from outside the cluster.

## Install Helm

It's a good idea to install Helm (a good way to install more complex packages and services on your cluster) according to [the official website](https://helm.sh/docs/intro/quickstart).

## Load-balancing and ingress

We're now ready to route external traffic to the cluster.

### Create a load balancer

Use your provider's load balancer service (or create your own load balancer using a reverse-proxy like Nginx) and make a note of the IP address (or host name) of the load balancer server. Add your kubernetes worker nodes to your load balancer's distribution group.

If you have a domain name you want to associate with a service on your cluster, update your DNS settings to point the domain to the load balancer.

Next install the `nginx-ingress` k8s ingress controller via Helm (inserting the IP address of your load balancer). 

```
helm install nginx-ingress stable/nginx-ingress \
--set controller.replicaCount=2 \
--set controller.nodeSelector."beta\.kubernetes\.io/os"=linux \
--set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux \
--set controller.service.loadBalancerIP=“<LOAD BALANCER IP>”
```

Check the services (`kubectl get services`) now running and note the HTTP/HTTPS ports used by the new ingress controller. Update your load balancer to use these ports as the forwarding ports in the load balancer settings (e.g. 80 -> 32345, 443 -> 31454).

Finally create an ingress resource for the domain/service by applying the following (replacing the relevant details for your domain name (host) and the service name and port requests should be routed to).

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
name: primary-ingress
annotations:
  kubernetes.io/ingress.class: nginx
spec:
  rules:
    - host: <DOMAIN>
    http:
      paths:
          - backend:
            serviceName: <SERVICE NAME>
            servicePort: <SERVIE PORT>
    - http:
      paths:
          - backend:
            serviceName: nginx # this is default
            servicePort: 80
```

This ingress forwards all requests to the host `<DOMAIN>` through to `<SERVICE NAME>` on `<SERVICE PORT>`. All non-matched requests (i.e. to other domains) will be sent to the default backend - in this case a simple `nginx` service that returns 200 response codes (this is important to ensure load balancer health-checks pass).

Visiting `<DOMAIN>` in your web browser should now enable you to reach the service.

### Securing your ingress

Currently the ingress we created only accepts traffic over HTTP on port 80. To secure traffic (i.e. use HTTPS to access services), either terminate TLS at your load balancer and add relevant certificates there, or allow your cluster to handle the TLS connection, as described below.

You can add HTTPS for services you want to expose through your load balancer. To begin, ensure that the domain is pointing to your load balancer (as above), and that you can reach your service through the load balancer using your domain name. Finally ensure that port 443 traffic to your load balancer is routed to the HTTPS port of the ingress controller service.

We use `cert-manager` to automatically manage certificates for us through LetsEncrypt. Install `cert-manager`:

* Create a new namespace: `kubectl create namespace cert-manager`
* Apply the needed definitions: `kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.13.0/cert-manager.yaml`
* Verify pods come online (the `webhook` one may take longer): `kubectl get pods --namespace cert-manager`

Once installed, cert-manager is formed from Issuer objects (determines how and where certificates should be issued from) and Certificate objects (determines the Secrets which contain the certificate values - these can be autorenewed by `cert-manager`).

First, create an issuer that uses letsencrypt’s production ACME service:

```
apiVersion: cert-manager.io/v1alpha2
kind: Issuer
metadata:
  name: letsencrypt-prod
  namespace: default
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: <YOUR EMAIL>
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    # An empty 'selector' means that this solver matches all domains
    - selector: {}
      http01:
        ingress:
          class: nginx
```

Next, create a certificate that uses this issuer:

```
apiVersion: cert-manager.io/v1alpha2
kind: Certificate
metadata:
  name: certificate-prod
  namespace: default
spec:
  secretName: domain-tls
  issuerRef:
    name: letsencrypt-prod
  commonName: <DOMAIN>
  dnsNames:
  - <OTHER DOMAINS>
```

Finally, update the ingress we created earlier to add a `tls` section that references the secret created by the Certificate:

```
...
spec:
  tls:
  - hosts:
    - <DOMAIN>
    secretName: domain-tls
  rules:
  - host: <DOMAIN>
    http: ...
```

After a few seconds your certificate should be issued and your service will be available via HTTPS through the load balancer.
