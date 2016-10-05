---
year: 2015
month: 4
day: 28
title: Media and volume keys in i3
---

<p>As is the case with many people, all music I listen to on my PC these days plays from the web through a browser. I'm a heavy user of Google Play Music and SoundCloud, and using Chrome to handle everything means playlists and libraries (and the way I use them through extensions) sync up properly everywhere I need them.</p>

<p>On OS X I use <a href="http://beardedspice.com" target="_blank">BeardedSpice</a> to map the keyboard media controls to browser-based music-players, and the volume keys adjusted the system as they should. Using <a href="https://i3wm.org" target="_blank">i3</a> (and other lightweight window managers) can make you realise what you take for granted when using more fully-fledged arrangements, but it doesn't take long to achieve the same functionality on such systems.</p>

<p>A quick search revealed <a href="https://github.com/borismus/keysocket" target="_blank">keysocket</a> - a Chrome extension that listens out for the hardware media keys and is able to interact with a large list of supported music websites. In order to get the volume controls working, I needed to map i3 through to <span class="code">alsa</span>, and this turned out to be pretty straight-forward too. It only required the addition of three lines to my i3 config to handle the volume-up, volume-down, and mute keys:</p>

<pre>
bindsym XF86AudioRaiseVolume exec amixer -q set Master 4%+ unmute
bindsym XF86AudioLowerVolume exec amixer -q set Master 4%- unmute
bindsym XF86AudioMute exec amixer -q set Master toggle
</pre>

<p>And for fun added the block below to <span class="code">~/.i3status.conf</span> to get the volume displayed on the status bar:</p>

<pre>
volume master {
    format = "♪ %volume "
    device = "default"
    mixer = "Master"
    mixer_idx = 0
}
</pre>
