---
year: 2013
month: 5
day: 7
title: Contribution to Heroku Dev Center
layout: post
---

<p>The <a href="https://devcenter.heroku.com" target="_blank">Heroku Dev Center</a> is a repository of guides and articles to provide support for those writing applications to be run on the <a href="https://heroku.com" target="_blank">Heroku</a> platform.</p>

<p>I recently contributed an article for carrying out <a href="https://devcenter.heroku.com/articles/s3-upload-python" target="_blank">Direct to S3 File Uploads in Python</a>, as I have previously used a very similar approach to interface with Amazon's Simple Storage Service in one of my apps running on Heroku.</p>

<p>The approach discussed in the article focuses on avoiding as much server-side processing as possible, with the aim of preventing the app's web dynos from becoming too tied up and unable to respond to further requests. This is done by using client-side JavaScript to asynchronously carry out the upload directly to S3 from the web browser. The only necessary server-side processing involves the generation of a temporarily-signed (using existing AWS credentials) request, which is returned to the browser in order to allow the JavaScript to successfully make the final <span class="code">PUT</span> request.</p>

<p>The guide's <a href="https://github.com/willwebberley/FlaskDirectUploader" target="_blank">companion git repository</a> hopes to demonstrate a simple use-case for this system. As with all of the Heroku Dev Center articles, if you have any feedback (e.g. what could be improved, what helped you, etc.), then please do provide it!</p>
