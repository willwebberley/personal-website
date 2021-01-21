---
year: 2013
month: 9
day: 14
title: CasaStream
description: "Discussing a solution for multi-room synchronous audio playback"
layout: post
---

<p>In my <a href="http://will.now.sh/blog/2013/9/2/zoned-network-sound-streaming-the-problem" target="_blank">last post</a> I discussed methods for streaming music to different zones in the house. More specifically I wanted to be able to play music from one location and then listen to it in other rooms at the same time and in sync.</p>

<p>After researching various methods, I decided to go with using a compressed MP3 stream over RTP. Other techniques introduced too much latency, did not provide the flexibility I required, or simply did not fulfill the requirements (e.g. not multiroom, only working with certain applications and non-simultaneous playback).</p>

<p>To streamline the procedure of compressing the stream, broadcasting the stream, and receiving and playing the stream, I have started a project to create an easily-deployable wrapper around PulseAudio and VLC. The system, somewhat cheesily named <a href="https://github.com/willwebberley/CasaStream" target="_blank">CasaStream</a> and currently written primarily in Python, relies on a network containing one machine running a CasaStream Master server and any number of machines running a CasaStream Slave server.</p>

<img src="/media/blog/casastream1.png" class="large-image blog-image" />

<p>The Master server is responsible for compressing and broadcasting the stream, and the Slaves receive and play the stream back through connected speakers. Although the compression is relatively resource-intensive (at least, for the moment), the Slave server is lightweight enough to be run on low-powered devices, such as the Raspberry Pi. Any machine that is powerful enough to run the Master could also simultaneously run a Slave, so a dedicated machine to serve the music alone is not required.</p>

<img src="/media/blog/casastream2.png" class="blog-image" />

<p>The Master server also runs a web interface, allowing enabling of the system and to disable and enable Slaves. Slave servers are automatically discovered by the Master, though it is possible to alter the scan range from the web interface also. In addition, the selection of audio sources to stream (and their output volumes) and the renaming of Slaves are available as options. Sound sources are usually automatically detected by PulseAudio (if it is running), so there is generally no manual intervention required to 'force' the detection of sources.</p>

<p>My current setup consists of a Master server running on a desktop machine in the kitchen, and Slave servers running on various other machines throughout the house (including the same kitchen desktop connected to some orbital speakers and a Raspberry Pi connected to the surround sound in the living room). When all running, there is no notable delay between the audio output in the different rooms.</p>

<p>There are a few easily-installable dependencies required to run both servers. Both require Python (works on V2.*, but I haven't tested on V3), and both require the Flask microframework and VLC. For a full list, please see the <a href="https://github.com/willwebberley/CasaStream/blob/master/README.md" target="_blank">README</a> at the project's home, which also provides more information on the installation and use.</p>

<p>Unfortunately, there are a couple of caveats: firstly, the system is not reliable over WLAN (the sound gets pretty choppy), so a wired connection is recommended. Secondly, if using ethernet-over-power to mitigate the first caveat, then you may experience sound dropouts every 4-5 minutes. To help with this problem, the Slave servers are set to restart the stream every four minutes (by default).</p>

<p>This is quite an annoying issue, however, since having short sound interruptions every few minutes is very noticeable. Some of my next steps with this project, therefore, are based around trying to find a better fix for this. In addition, I'd like to reduce the dependency footprint (the Slave servers really don't need to use a fully-fledged web server), reduce the power requirements at both ends, and to further automate the installation process.</p>
