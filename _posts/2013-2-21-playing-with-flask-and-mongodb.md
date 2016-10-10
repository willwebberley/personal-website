---
year: 2013
month: 2
day: 21
title: Playing with Flask and MongoDB
---

<p>
I've always been a bit of an Apache/PHP fanboy - I find the way they work together logical and easy to set up and I enjoy how
easy it is to work with databases and page-routing in PHP. </p>
<p>
However, more recently I've found myself looking for other ways to handle web applications and data. I've messed around with Node.js, Django, etc., in the past but, particularly with Django, found that there seems to be a lot of setting-up involved even in creating quite small applications. Despite this, I understand that once setup properly Django can scale very well and managing large applications becomes very easy.</p>
<p>
<a href="http://flask.pocoo.org/" target="_blank">Flask</a> is a Python web framework (like Django, except smaller) which focuses on
its easiness and quickness to setup and its configurability. Whilst it doesn't, by default, contain all the functionality that
larger frameworks provide, it is extensible through the use of extra modules and addons.
</p>
<p>I thought I'd use it for a quick play around to introduce myself to it. Most of this post is for my own use to look back on.</p>
<p>As it is Python, it can be installed through pip or easy_install:</p>
<pre class="shell"># easy_install flask</pre>
<p>Note: If Python is not yet installed, then install that (and its distribution tools) for your system first. 
For example, in Arch Linux:</p>
<pre class="shell"># pacman -S python2 python2-distribute</pre>
<p>
<p>In terms of data storage, I used <a href="http://www.mongodb.org/" target="_blank">MongoDB</a>, a non-SQL, document-oriented 
approach to handling data. This can be downloaded and installed from their 
<a href="http://www.mongodb.org/downloads" target="_blank">website</a> or your own distro may distribute it. 
For example, in Arch:</p>
<pre class="shell"># pacman -S mongodb</pre>
<p>MongoDB can be started as a standard user. Create a directory to hold the database and then start it as follows:
<pre class="shell">$ mkdir data/db<br />$ mongodb --dbpath data/db</pre>
<p>This will start the server and runs, by default, on port 27017. The basic setup is now complete, and you can now start working on the application.</p>
<hr />
<p>A complete example (including all necessary code and files) is available in <a href="https://github.com/flyingsparx/MongoFlask" target="_blank">this repository</a>. This also includes a more comprehensive walkthrough to getting started.</p>
