---
year: 2013
month: 4
day: 8
title: A simple outbound mail server
layout: post
---

<p>
Being able to send emails is an important part of a server's life, especially if it helps support a website. If you manage your own servers for running a website and need to send outgoing email (e.g. for newsletters, password resets, etc.), then you'll need to run an SMTP server to handle this for you. 
</p>
<p>
You will need to have properly configured your DNS settings for email to work properly. This is because most email providers will run rDNS (reverse-DNS) lookups on incoming email to ensure it isn't someone else pretending to send emails from your domain. An rDNS lookup basically involves matching the resolved IP from your domain name (after the "@" sign in the email address) to the domain name addressed by the IP in DNS. If the r-DNS lookup fails, then email providers may automatically mark your emails as spam.
</p>
<p>Your DNS host settings should point your domain name towards the IP of your host as an A record. In addition, it is sometimes necessary to add a TXT record (for the "@" subdomain) as <span class="code">v=spf1 ip4:xxx.xxx.xxx.xxx -all</span>. This indicates to mail providers that the IP (represented by the <span class="code">x</span>'s) is authorised to send mail for this domain. This further reduces the chance that your email will be marked as spam. Since we are not intending to receive mail at this server, either leave the MX records blank, configure them to indicate a different server, set up a mail-forwarder, or something else.
</p>
<p>The following mail server set up is aimed at Arch Linux, but the gist of it should be compatible for many UNIX-based systems. The mail server I am covering is <a href="http://www.postfix.org/" target="_blank">postfix</a>. This can easily be installed (e.g. on Arch):</p>
<pre class="shell">
# pacman -S postfix</pre>
<p>Once installed, edit the configuration file in <span class="code">/etc/postfix/main.cf</span> so that these lines read something like this:</p>
<pre class="shell">
myhostname = mail.domain.tld<br />
mydomain = domain.tld<br />
myorigin = domain.tld</pre>
<p>Next, edit the file <span class="code">/etc/postfix/aliases</span> such that:</p>
<pre class="shell">
root: your_username</pre>
<p>Replace <span class="code">your_username</span> with the user who should reveive <span class="code">root</span>'s mail.</p>
<p>Finally, refresh the alias list, enable the service so that postfix starts on boot, and then start postfix:</p>
<pre class="shell">
# cd /etc/postfix && newaliases<br />
# systemctl enable postfix.service<br />
# systemctl start postfix.service</pre>
<p>You should now be able to send mail (e.g. through PHP, Python, Ruby, etc.) through this server. If you run the website on the same machine, simply tell the application to use <span class="code">localhost</span> as the mail server, though this is usually default anyway.</p>
