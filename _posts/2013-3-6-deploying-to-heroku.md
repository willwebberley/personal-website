---
year: 2013
month: 3
day: 6
title: Deploying to Heroku
---

<p>In my <a href="http://www.willwebberley.net/#post/2013-02-21" target="_blank">last post</a>, I
talked about developing Python applications using Flask (with MongoDB to handle data). The next stage
was to consider deployment options so that the application can be properly used.</p>
<p>Python is a popular language in the cloud, and so there are many cloud providers around who support
this kind of application
(<a href="http://aws.amazon.com/elasticbeanstalk/" target="_blank">Amazon Elastic Beanstalk</a>,
<a href="https://developers.google.com/appengine/" target="_blank">Google App Engine</a>,
<a href="https://www.pythonanywhere.com/" target="_blank">Python Anywhere</a>, etc.), but
<a href="http://www.heroku.com/" target="_blank">Heroku</a> seems the most attractive option
due to its logical deployment strategy, scalability and its range of addons (including providing
the use of MongoDB).</p>
<p>First, download the Heroku toolbelt from their website. This allows various commands
to be run to prepare, deploy and check the progress, logs and status of applications. Once
installed, log into your account using your Heroku email address and password:</p>
<pre class="shell">$ heroku login</pre>
<p>Install the dependencies of your project (this should usually be done inside a virtual Python environment).
In my case, these are <span class="code">Flask</span> and <span class="code">Flask-MongoAlchemy</span>:</p>
<pre class="shell">$ pip install Flask<br />
$ pip install Flask-MongoAlchemy</pre>
<p>We now declare these dependencies so that they can be installed for your deployed app.
This can be done using pip, which will populate a file of dependencies:</p>
<pre class="shell">$ pip freeze > requirements.txt</pre>
<p>The file requirements.txt should now list all the dependencies for the application. Next is
to declare how the application should be run (Heroku has web and worker dynos). In this case,
this is a web app. Add the following to a file <span class="code">Procfile</span>:</p>
<pre class="shell">web: python app_name.py</pre>
<p>This basically tells Heroku to execute <span class="code">python app_name.py</span> to start
a web dyno.</p>
<p>The application setup can now be tested using <span class="code">foreman</span>
(from the Heroku toolbelt). If successful (and you get the
expected outcome in a web browser), then the app is ready for deployment:</p>
<pre class="shell">$ foreman start</pre>
<p>Lastly, the app needs to be stored in Git and pushed to Heroku. After preparing a suitable
<span class="code">.gitignore</span> for the project, create a new Heroku app, initialize, commit
and push the project:</p>
<pre class="shell">$ heroku create<br />
$ git init<br />
$ git add .<br />
$ git commit -m "initial commit"<br />
$ git push heroku master</pre>
<p>Once done (assuming no errors), check its state with:</p>
<p class="code">$ heroku ps</p>
<p>If it says something like <span class="code">web.1: up for 10s</span> then the
application is running. If it says the application has crashed, then check the logs for errors:</p>
<pre class="shell">$ heroku logs</pre>
<p>Visit the live application with:</p>
<pre class="shell">$ heroku open</pre>
<p>Finally, I needed to add the database functionality. I used MongoHQ, which features useful tools
for managing MongoDB databases. Add this addon to your application using:</p>
<pre class="shell">$ heroku addons:add mongohq:sandbox</pre>
<p>This adds the free version of the addon to the application. Visit the admin interface
from the Apps section of the website to add a username and password. These (along with the
host and port) need to be configured in your application in order to work. e.g.:</p>
<pre class="python">
app.config['MONGOALCHEMY_USER'] = 'will'<br />
app.config['MONGOALCHEMY_PASSWORD'] = 'password'<br />
app.config['MONGOALCHEMY_SERVER'] = 'sub.domain.tld'<br />
etc.</pre>
<p>It may be that this step will need to be completed earlier if the application depends on
the database connection to run.</p>
