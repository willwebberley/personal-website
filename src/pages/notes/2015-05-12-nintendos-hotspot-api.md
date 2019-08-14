---
year: 2015
month: 5
day: 12
title: Nintendo's Hotspot 'API'
layout: post
---

<p>Since getting a DS, <a href="http://www.nintendo.com/3ds/built-in-software/streetpass" target="_blank">StreetPass</a> has become quite addictive. It's actually pretty fun checking the device after walking through town or using public transport to see a list of Miis representing the people you've been near recently, and the minigames (such as StreetPass Quest) that require you to 'meet' people in order to advance also make it more involved. Essentially the more you're out and about, the further you can progress - this is further accentuated through Play Coins, which can be used to help 'buy' your way forward and are earned for every 100 steps taken whilst holding the device.</p>

<img src="/media/blog/nintendozone2.png" class="blog-image" />

<p>The DS systems can also use relay points in Nintendo Zone hotspots to collect StreetPass hits. These zones are special WiFi access points hosted in certain commercial venues (e.g. in McDonalds and Subway restaurants), and allow you to 'meet' people around the world who also happen to be in another Nintendo Zone at the same time. As such, users can get a lot of hits very quickly (up to a maximum of 10 at a time). There are various ways people have <a href="https://gbatemp.net/threads/how-to-have-a-homemade-streetpass-relay.352645" target="_blank">found</a> to set up a 'home' zone, but Nintendo have also published a <a href="https://microsite.nintendo-europe.com/hotspots" target="_blank">map</a> to display official nearby zones.</p>

<p>However, their map seems a little clunky to use while out and about, so I wanted to see if there could be an easier way to get this information more quickly. When using the map, the network logs revealed <span class="code">GET</span> requests being made to:</p>
<pre>
https://microsite.nintendo-europe.com/hotspots/api/hotspots/get
</pre>
<p>The location for which to retrieve data is specified through the <span class="code">zoom</span> and <span class="code">bbox</span> parameters, which seem to map directly to the zoom level and the bounds reported by the underlying Google Maps API being used. For some reason, the parameter <span class="code">summary_mode=true</span> also needs to be set. As such, a (unencoded) request for central Cardiff may look like this:</p>
<pre>
/hotspots/api/hotspots/get?summary_mode=true&zoom=18&bbox=51.480043,-3.180592,51.483073,-3.173028
</pre>
<p>Where the coordinates (<span class="code">51.480043,-3.180592</span>) and (<span class="code">51.483073,-3.173028</span>) respectively represent the lower-left and upper-right corners of the bounding box. The response is in JSON, and contains a lat/lng for each zone, a name, and an ID that can be used to retrieve more information about the host's zone using this URL format:</p>

<pre>https://microsite.nintendo-europe.com/hotspots/#hotspot/&lt;ID&gt;</pre> 

<p>When the map is zoomed-out (to prevent map-cluttering) a zone 'group' might be returned instead of an individual zone, for each of which the size is indicated. Zooming back in to a group then reveals the individual zones existing in that area.</p>

<img src="/media/blog/nintendozone1.png" class="blog-image right" />

<p>It seems that this server endpoint does not support cross-origin resource-sharing (CORS), which means that the data is not retrievable for a third-party web-app (at least, without some degree of proxying) due to browser restrictions. However, and especially since the endpoint currently requires no session implementation or other kind of authentication, the data seems very easily retrievable and manageable for non-browser applications and other types of systems.</p>
