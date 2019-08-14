---
year: 2012
month: 11
day: 13
title: Delving into Android
layout: post
---

<img src="/media/blog/tides-main.png" alt="Tides Main Activity" class="blog-image"/>
<p>
I've always been interested in the development of smartphone apps, but have never really had the opportunity
to actually hava a go. Whilst I'm generally OK with development on platforms I feel comfortable with, I've always
considered there to be no point in developing applications for wider use unless you have a good idea about first thinking
about the direction for it to go.
</p>

<p>
My Dad is a keen surfer and has a watch which tells the tide changes as well as the time. It shows the next event (i.e. low- or high-tide)
and the time until that event, but he always complains about how inaccurate it is and how it never correctly predicts the tide 
schedule for the places he likes to surf.</p>

<p>He uses an Android phone, and so I thought I'd try making an app for him that would be more accurate than his watch, and 
maybe provide more interesting features. The only tricky criterion, really, was that he needed it to predict the tides offline, since
the data reception is very poor in his area.</p>



<p>I got to work on setting up a database of tidal data, based around the location he surfs in, and creating a basic UI in which to display it. 
When packaging the application with an existing SQLite database, this <a href="https://github.com/jgilfelt/android-sqlite-asset-helper" target="_blank">helper class</a> was particularly useful.</p>
<img src="/media/blog/tides-settings.png" alt="Tides Settings Activity" class="blog-image"/>
<p>
A graphical UI seemed the best approach for displaying the data, so I 
tried <a href="http://androidplot.com/" target="_blank">AndroidPlot</a>, a highly-customisable graphing
library, to show the tidal patterns day-by-day. This seemed to work OK (though not entirely accurately - tidal patterns form
more of a cosine wave rather than the zigzags my graph produced, but the general idea is there), so I added more features, such as 
a tide table (the more traditional approach) and a sunrise and sunset timer.
</p>



<p>I showed him the app at this stage, and he decided it could be improved by adding weather forecasts. Obviously, preidcting the 
weather cannot be done offline, so having sourced a decent <a href="http://www.worldweatheronline.com/" target="_blank">weather API</a>, 
I added the weather forecast for his area too. Due to the rate-limiting of World Weather Online, a cache is stored in a database
on the host for this website, which, when queried by the app, will make the request on the app's behalf and store the data until
it is stale.</p>

<p>I added a preferences activity for some general customisation, and that's as far as I've currently got. In terms of development,
I guess it's been a good introduction to the ideas behind various methodologies and features, such as the manifest file, networking, 
local storage, preferences, and layout design. I'll create a Github repository for it when I get round to it.</p>
