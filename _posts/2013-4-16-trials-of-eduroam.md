---
year: 2013
month: 4
day: 16
title: Trials of Eduroam
layout: post
---

<p>
I've been having trouble connecting to Eduroam, at least reliably and persistently, in some barebones BNU/Linux installs and basic window managers. Eduroam is the wireless networking service used by many Universities in Europe, and whilst it would probably work fine using the tools provided by heavier DEs, I wanted something that could just run quickly and independently.
</p>
<p>Many approaches require the editing of loads of config files (especially true for <span class="code">netcfg</span>), which would need altering again after things like password changes. The approach I used (for Arch Linux) is actually really simple and involves the use of the user-contributed <span class="code">wicd-eduroam</span> package available in the <a href="https://aur.archlinux.org/packages/wicd-eduroam/" target="_blank">Arch User Repository</a>.</p>
<p>Obviously, <span class="code">wicd-eduroam</span> is related to, and depends on, <span class="code">wicd</span>, a handy network connection manager, so install that first:</p>
<pre class="shell">
# pacman -S wicd<br />
$ yaourt -S wicd-eduroam</pre>
<p>(If you don't use <span class="code">yaourt</span>, download the <a href="https://aur.archlinux.org/packages/wi/wicd-eduroam/wicd-eduroam.tar.gz" target="_blank">tarball</a> and build it using the <span class="code">makepkg</span> method.)</p>
<p><span class="code">wicd</span> can conflict with other network managers, so stop and disable them before starting and enabling <span class="code">wicd</span>. This will allow it to startup at boot time. e.g.:</p>
<pre class="shell">
# systemctl stop NetworkManager<br />
# systemctl disable NetworkManager<br />
# systemctl start wicd<br />
# systemctl enable wicd</pre>
<p>Now start <span class="code">wicd-client</span> (or set it to autostart), let it scan for networks, and edit the properties of the network <span class="code">eduroam</span>. Set the encryption type as <span class="code">eduroam</span> in the list, enter the username and password, click OK and then allow it to connect.</p> 
