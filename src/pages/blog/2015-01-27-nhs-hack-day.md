---
year: 2015
month: 1
day: 27
title: NHS Hack Day
layout: post
---

<p>This weekend I took part in the <a href="http://nhshackday.com" target="_blank">NHS Hack Day</a>. The idea of the event is to bring healthcare professionals together with technology enthusiasts in order to build stuff that is useful for those within the NHS and for those that use it. It was organised by <a href="https://twitter.com/amcunningham" target="_blank">AnneMarie Cunningham</a>, who did a great job in making the whole thing run smoothly!</p>

<img src="/media/blog/nhshackday2.jpg" class="large-image blog-image" />
<p class="small">This was our team! The image is released under a Creative Commons BY-NC2.0 license by <a href="https://www.flickr.com/photos/paul_clarke" target="_blank">Paul Clarke</a>.</p>

<p>I was asked to go along and give a hand by <a href="http://martinjc.com" target="_blank">Martin</a>, who also had four of his MSc students with him. <a href="http://mattjw.net" target="_blank">Matt</a>, previously from <a href="http://cs.cf.ac.uk" target="_blank">Cardiff CS&I</a>, also came to provide his data-handling expertise.</p>

<img src="/media/blog/nhshackday.png" class="large-image blog-image" />

<p>We built a webapp, called <a href="http://compjcdf.github.io/nhs_hack/app.html" target="_blank">Health Explorer Wales</a>, that attempts to visualise various data for health boards and communities in Wales. One of the main goals of the app was to make it maintainable, so that users in future could easily add their own geographic or numeric data to visualise. For this, it was important to decide on an extensible <a href="https://github.com/CompJCDF/nhs_hack/blob/master/data/descriptors.json" target="_blank">data schema</a> for describing data, and suitable data formats.</p>

<p>Once the schema was finalised, we were able to go ahead and build the front-end, which used <a href="http://d3js.org" target="_blank">D3.js</a> to handle the visualisations. This was the only third-party library we used in the end. The rest of the interface included controls, such as a dataset-selector and controls for sliding back through time (for timeseries data). The app is purely front-end, which means it can essentially be shipped as a single HTML file (with linked scripts and styles).</p>

<p>We also included an 'add dataset' feature, which allows users to add a dataset to be visualised, as long as the schema is observed. In true hackathon style, any exceptions thrown will currently cause the process to fail silently ;) The <a href="https://github.com/CompJCDF/nhs_hack" target="_blank">GitHub repository</a> for the app contains a wiki with some guidance on data-formatting. Since the app is front-end only, any data added is persisted using HTML5 local storage and is therefore user-specific.</p>

<p>Generally, I am pleased with the result. The proof-of-concept is (mostly) mobile-friendly, and allows for easily showing off data in a more comprehensible way than through just using spreadsheets. Although we focussed on visualising only two datatypes initially (we all <3 <a href="https://twitter.com/_r_309" target="_blank">#maps</a>), we hope to extend this by dropping in modules for supporting new formats in the future.</a>

<p>There were many successful projects completed as part of the event, including a new 'eye-test' concept involving a zombie game using an Oculus Rift and an app for organising group coastal walks around Wales. A full list of projects is available on the event's <a href="http://nhshackday.com/previous/events/2015/01/cardiff" target="_blank">website</a>. I really enjoyed the weekend and hope to make the next one in London in May!</p>
