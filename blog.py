# Methods for blog support.

import datetime, time, math, json

class Post:
    title = Column(String)
    content = Column(String)
    day = Column(String)
    month = Column(String)
    year = Column(String)

    def __init__(self,title,content,day,month,year):
        self.title = title
        self.content = content
        self.day = day
        self.month = month
        self.year = year

# Process the provided post to add a url_title field
# this field should be used as part of the 
# getPostByDateAndTitle endpoint.
def processPost(post):
    title = post.title
    for ch in disallowed_in_url:
        if ch in title:
            title = title.replace(ch, "")
    post.url_title = title.replace(" ","-")
    return post

# Get a list of all posts ordered by date descending
def getPosts():
    myList = []
    for post in sess.query(Post).order_by(Post.date.desc()):
        post = processPost(post)
        myList.append(post)
    return myList

# Get a post by date
def getPostByDate(year, month, day):
    post = sess.query(Post).filter_by(year=int(year),month=int(month),day=int(day)).first()
    post = processPost(post)
    return post 

# Get a post by date and title
def getPostByDateAndTitle(year, month, day, title):
    for ch in disallowed_in_url:
        if ch in title:
            title = title.replace(ch, "")
    posts = sess.query(Post).filter_by(year=int(year),month=int(month),day=int(day))
    for post in posts:
        post = processPost(post)
        if post.url_title.lower() == title.lower():
            return post
