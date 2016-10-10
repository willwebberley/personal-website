---
year: 2013
month: 4
day: 23
title: flyingsparx.net On Digital Ocean
---

<p>My hosting for <a href="http://www.willwebberley.net" target="_blank">willwebberley.net</a> has nearly expired, so I have been looking for renewal options.</p>
<p>These days I tend to need to use servers for more than simple web-hosting, and most do not provide the flexibility that a VPS would. Having (mostly) full control over a properly-maintained virtual cloud server is so much more convenient, and allows you to do tonnes of stuff beyond simple web hosting.</p>
<p>I have some applications deployed on <a href="https://www.heroku.com" target="_blank">Heroku</a>, which is definitely useful and easy for this purpose, but I decided to complement this for my needs by buying a 'droplet' from <a href="https://www.digitalocean.com" target="_blank">Digital Ocean</a>.</p>
<p>Droplets are DO's term for a server instance, and are super quick to set up (55 seconds from first landing at their site to a booted virtual server, they claim) and very reasonably priced. I started an Arch instance, quickly set up nginx, Python and uwsgi, and started this blog and site as a Python app running on the Flask microframework.</p>
<p>So far, I've had no issues, and everything seems to work quickly and smoothly. If all goes to plan, over the next few months I'll migrate some more stuff over, including the backend for the Gower Tides app.</p>