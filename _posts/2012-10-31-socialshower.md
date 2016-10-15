---
year: 2012
month: 10
day: 31
title: SocialShower
layout: post
---

<p>
A few weeks ago I wrote some PHP scripts that can retrieve some of your social interactions and display them in a webpage (though the 
scripts could easily be modified to return JSON or XML instead). When styled, they can produce effects similar to those on the Contact
page of this website (<a href="#contact">here</a>).</p>

<img src="/media/blog/socialshower_image.png" alt="SocialShower" class="blog-image"/>

<p>Currently they are available for retrieving recent tweets from Twitter, recent listens from Last.fm and recent uploads to Picasa Web 
Albums.</p>

<p>The scripts run, in their current state, when the appropriate function is called from the included script. As a result, this could seriously slow down the page-load time if called as part of the page request.
If embedded in a webpage, they should be run through an AJAX call after the rest of the page has loaded.</p>

<p>The repo for the code (and example useage) is available from <a href="https://github.com/flyingsparx/SocialShower" target="_blank">Github</a>.</p>
