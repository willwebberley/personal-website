---
year: 2014
month: 1
day: 17
title: Direct-to-S3 Uploads in Node.js
layout: post
---

<p>A while ago I wrote an <a href="https://devcenter.heroku.com/articles/s3-upload-python" target="_blank">article</a> for <a href="https://heroku.com" target="_blank">Heroku</a>'s Dev Center on carrying out direct uploads to S3 using a Python app for signing the PUT request. Specifically, the article focussed on Flask but the concept is also applicable to most other Python web frameworks.</p>

<p>I've recently had to implement something similar, but this time as part of an <a href="http://nodejs.org" target="_blank">Node.js</a> application. Since the only difference between the two approaches is literally just the endpoint used to return a signed request URL, I thought I'd post an update on how the endpoint could be constructed in Node.</p>

<p>The front-end code in the companion repository demonstrates an example of how the endpoint can be queried to retrieve the signed URL, and is available <a href="https://github.com/willwebberley/FlaskDirectUploader/blob/master/templates/account.html" target="_blank">here</a>. Take a look at that repository's README for information on the front-end dependencies.</p>

<p>The full example referenced by the Python article is in a <a href="https://github.com/willwebberley/FlaskDirectUploader" target="_blank">repository</a> hosted by GitHub and may be useful in providing more context.</p>
