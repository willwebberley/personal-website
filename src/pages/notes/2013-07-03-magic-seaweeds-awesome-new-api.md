---
year: 2013
month: 7
day: 3
title: Magic Seaweed's Awesome New API
description: "Making use of the Magic Seaweed web API for surf data"
layout: post
---

<p>Back in March, I emailed <a href="http://magicseaweed.com" target="_blank">Magic Seaweed</a> to ask them if they had a public API for their surf forecast data. They responded that they didn't at the time, but that it was certainly on their to-do list. I am interested in the marine data for my <a href="https://play.google.com/store/apps/details?id=net.willwebberley.gowertides" target="_blank">Gower Tides</a> application.</p>
<p>Yesterday, I visited their website to have a look at the surf reports and some photos, when I noticed the presence of a <a href="http://magicseaweed.com/developer/api" target="_blank">Developer</a> link in the footer of the site. It linked to pages about their new API, with an overview describing exactly what I wanted.</p>
<p>Since the API is currently in beta, I emailed them requesting a key, which they were quick to respond with and helpfully included some further example request usages. They currently do not have any strict <a href="http://will.now.sh/blog/13/5/3/is-twitter's-new-api-really-such-a-nightmare?" target="_blank">rate limits</a> in place, but instead have a few <a href="http://magicseaweed.com/developer/terms-and-conditions" target="_blank">fair practice terms</a> to discourage developers from going a bit trigger happy on API requests. They also request that you use a hyperlinked logo to accredit the data back to them. Due to caching, I will not have to make too many requests (since the application will preserve 'stale' data for 30 minutes before refreshing from Magic Seaweed, when requested), so hopefully that will keep the app's footprint down.</p>
<p>I have written the app's new <a href="https://github.com/willwebberley/GowerTidesBackend" target="_blank">backend support</a> for handling and caching the surf data ready for incorporating into the Android app soon. So far, the experience has been really good, with the API responding with lots of detailed information - almost matching the data behind their own <a href="http://magicseaweed.com/Llangennith-Rhossili-Surf-Report/32/" target="_blank">surf forecasts</a>. Hopefully they won't remove any of the features when they properly release it!</p>
