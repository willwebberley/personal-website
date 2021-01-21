---
year: 2013
month: 7
day: 31
title: Gower Tides v1.4
description: "Announcing the latest version of Gower Tides Android app"
layout: post
---

<img src="https://will.now.sh/static/media/v1-4_surf.png" class="blog-image" alt="Surf forecasts" />
<p>Last week I released a new version of the tides Android app I'm currently developing.</p>

<p>The idea of the application was initially to simply display the tidal times and patterns for the Gower Peninsula, and that this should be possible without  a data connection. Though, as the time has gone by, I keep finding more and more things that can be added!</p>
<p>The latest update saw the introduction of 5-day surf forecasts for four Gower locations - Llangennith, Langland, Caswell Bay, and Hunts Bay. All the surf data comes from <a href="http://magicseaweed.com" target="_blank">Magic Seaweed</a>'s API (which I <a href="http://will.now.sh/post/2013/7/3" target="_blank">talked about</a> last time).</p>
<img src="https://flyingsparx.net/static/media/v1-4_location.png" class="blog-image right" alt="Location choices" />
<p>The surf forecasts are shown, for each day they are available, as a horizontal scroll-view, allowing users to scroll left and right within that day to view the forecast at different times of the day (in 3-hourly intervals).<br />
Location selection is handled by a dialog popup, which shows a labelled map and a list of the four available locations in a list view.</p>
<p>The <a href="https://github.com/willwebberley/GowerTidesBackend" target="_blank">backend support</a> for the application was modified to now also support 30-minute caching of surf data on a per-location basis (i.e. new calls to Magic Seaweed would not be made if the requested <i>location</i> had been previously pulled in the last 30 minutes). The complete surf and weather data is then shipped back to the phone as one JSON structure.</p>
<img src="https://flyingsparx.net/static/media/v1-4_tides.png" class="blog-image" alt="Tides view update" />
<p>Other updates were smaller but included an overhaul of the UI (the tide table now looks a bit nicer), additional licensing information, more speedy database interaction, and so on.</p>
<p>If you are interested in the source, then that is available <a href="https://github.com/willwebberley/GowerTides" target="_blank">here</a>, and the app itself is on <a href="https://play.google.com/store/apps/details?id=net.willwebberley.gowertides&hl=en" target="_blank">Google Play</a>. If you have any ideas, feedback or general comments, then please let me know!</p>
