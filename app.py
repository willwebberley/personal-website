from flask import Flask, url_for, render_template, request, session, escape, redirect, send_file
import os,datetime, time, math
from blog import *
import json

app = Flask(__name__)
admin_password = os.environ.get('FLYINGSPARX_PASSWORD')
access_token = os.environ.get('FLYINGSPARX_TOKEN')
app.secret_key = os.environ.get('FLYINGSPARX_KEY')


@app.route('/transfer')
def transfer():
    transferPosts()
    return "Done"

# flyingsparx.net/ 
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/cv')
def cv():
    return send_file('static/downloads/cv.pdf', as_attachment=False, mimetype='application/pdf')

# flyingsparx.net/blog 
# Get all blog posts and pass to templates for rendering
# TODO: modified to allow pagination
@app.route('/blog')
def blog():
    postList = getPosts()
    return render_template('blog.html', posts = postList, single = False)


# flyingsparx.net/post/year/month/day
# Get the post posted on this day and pass to template for rendering.
@app.route('/post/<year>/<month>/<day>/')
def post(year, month, day):
    post = getPostByDate(year, month, day)
    postList = []
    if not post == None:
        postList.append(post)
    return render_template('blog.html', posts = postList, single = True)

# flyingsparx.net/post/year/month/day/title
# Get the post posted on this day and pass to template for rendering.
# Changed site to use this method internally to allow for multiple posts/day.
@app.route('/blog/<year>/<month>/<day>/<title>/')
def postByTitle(year, month, day, title):
    post = getPostByDateAndTitle(year, month, day, title)
    postList = []
    if not post == None:
        postList.append(post)
    return render_template('blog.html', posts = postList, single = True)

# flyingsparx.net/contact
@app.route('/contact/')
def contact():
        return render_template('contact.html', )

# flyingsparx.net/research
@app.route('/research/')
def research():
        return render_template('research.html')

# flyingsparx.net/output
@app.route('/output/')
def output():
        return render_template('output.html')

# flyingsparx.net/notes
@app.route('/notes/')
def notes():
        return render_template('notes.html')


# flyingsparx.net/project
@app.route('/project/')
def project():
        return render_template('project.html')

# flyingsparx.net/teaching
@app.route('/teaching/')
def teaching():
        return render_template('teaching.html')

# Main code
if __name__ == '__main__':
    app.run(port=3001)
