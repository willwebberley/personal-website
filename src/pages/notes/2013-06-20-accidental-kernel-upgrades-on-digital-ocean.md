---
year: 2013
month: 6
day: 20
title: Accidental Kernel Upgrades on Digital Ocean
description: "Issues when accidentally upgrading the kernel in Arch Linux on Digital Ocean"
layout: post
---

<p>I today issued a full upgrade of the server at flyingsparx.net, which is hosted by <a href="https://www.digitalocean.com" target="_blank">Digital Ocean</a>. By default, on Arch, this will upgrade every currently-installed package (where there is a counterpart in the official repositories), including the Linux kernel and the kernel headers.</p>
<p>Digital Ocean maintain their own kernel versions and do not currently allow kernel switching, which is something I completely forgot. I rebooted the machine and tried re-connecting, but SSH couldn't find the host. Digital Ocean's website provides a console for connecting to the instance (or 'droplet') through VNC, which I used, through which I discovered that none of the network interfaces (except the loopback) were being brought up. I tried everything I could think of to fix this, but without being able to connect the droplet to the Internet, I was unable to download any other packages.</p>
<p>Eventually, I contacted DO's support, who were super quick in replying. They pointed out that the upgrade may have also updated the kernel (which, of course, it had), and that therefore the modules for networking weren't going to load properly. I restored the droplet from one of the automatic backups, swapped the kernel back using DO's web console, rebooted and things were back to where they should be.</p>
<p>The fact that these things can be instantly fixed from their console and their quick customer support make Digital Ocean awesome! If they weren't possible then this would have been a massive issue, since the downtime also took out this website and the backend for a couple of mobile apps. If you use an Arch instance, then there is a <a href="https://www.digitalocean.com/community/articles/pacman-syu-kernel-update-solved-how-to-ignore-arch-kernel-upgrades" target="_blank">community article</a> on their website explaining how to make pacman ignore kernel upgrades and to stop this from happening.</p>
