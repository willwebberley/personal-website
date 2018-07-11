---
year: 2013
month: 4
day: 5
title: "Normal service resumed: AJAX + Python + Amazon S3"
layout: post
---

<p>
I wanted a way in which users can seamlessly upload images for use in the Heroku application discussed in previous posts.</p>
<p>Ideally, the image would be uploaded through AJAX as part of a data-entry form, but without having to refresh the page or anything else that would disrupt the user's experience. As far as I know, barebones JQuery does not support AJAX uploads, but <a href="http://www.malsup.com/jquery/form/#file-upload" target="_blank">this handy plugin</a> does.</p>
<h3>Handling the upload (AJAX)</h3>
<p>I styled the file input nicely (in a similar way to <a href="http://ericbidelman.tumblr.com/post/14636214755/making-file-inputs-a-pleasure-to-look-at" target="_blank">this guy</a>) and added the JS so that the upload is sent properly (and to the appropriate URL) when a change is detected to the input (i.e. the user does not need to click the 'upload' button to start the upload).</p>
<h3>Receiving the upload (Python)</h3>
<p>The backend, as previously mentioned, is written in Python as part of a Flask app. Since Heroku's customer webspace is read-only, uploads would have to be stored elsewhere. <a href="http://boto.s3.amazonaws.com/index.html" target="_blank">Boto</a>'s a cool library for interfacing with various AWS products (including S3) and can easily be installed with <span class="code">pip install boto</span>. From this library, we're going to need the <span class="code">S3Connection</span> and <span class="code">Key</span> classes:</p>
<pre class="python">
from boto.s3.connection import S3Connection<br />
from boto.s3.key import Key
</pre>
<p>Now we can easily handle the transfer using the <span class="code">request</span> object exposed to Flask's routing methods:</p>
<pre class="python">
file = request.files['file_input_name']<br />
con = S3Connection(<'AWS_KEY'>, <'AWS_SECRET'>)<br />
key = Key(con.get_bucket(<'BUCKET_NAME'>))<br />
key.set_contents_from_file(file)
</pre>
<p>Go to the next step for the AWS details and the bucket name. Depending on where you chose your AWS location as (e.g. US, Europe, etc.), then your file will be accessible as something like <span class="code">https://s3-eu-west-1.amazonaws.com/<BUCKET_NAME>/<FILENAME></span>. If you want, you can also set, among other things, stuff like the file's mime type and access type:</p>
<pre class="python">
key.set_metadata('Content-Type', 'image/png')<br />
key.set_acl('public-read')</pre>
<h3>Setting up the bucket (Amazon S3)</h3>
<p>Finally you'll need to create the bucket. Create or log into your AWS account, go to the AWS console, choose your region (if you're in Europe, then the Ireland one is probably the best choice) and enter the S3 section. Here, create a bucket (the name needs to be globally unique). Now, go to your account settings page to find your AWS access key and secret and plug these, along with the bucket name, into the appropriate places in your Python file.</p>
<p>And that's it. For large files, this may tie up your Heroku dynos a bit while they carry out the upload, so this technique is best for smaller files (especially if you're only using the one web dyno). My example of a working implementation of this is available <a href="https://github.com/willwebberley/niteowl-web/blob/master/api.py" target="_blank">in this file</a>.</p>
