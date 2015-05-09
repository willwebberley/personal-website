# Methods for blog support.
# Includes functionality for creating, editing, listing, deleting blog posts, etc.

import datetime, time, math, json
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///static/data/posts.db')
Base = declarative_base()
Session = sessionmaker(bind=engine)
sess = Session()
disallowed_in_url = ["'","(",")","?","%","&","!","@","+",":"]

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)
    date = Column(Integer)
    day = Column(String)
    month = Column(String)
    year = Column(String)

    def __init__(self,id,title,content,date,day,month,year):
        self.id = id
        self.title = title
        self.content = content
        self.date = date
        self.day = day
        self.month = month
        self.year = year
Base.metadata.create_all(engine)

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

# Return all posts in JSON format (for external feeds)
def getPostsAsJSON():
    postList=[]
    for post in sess.query(Post).order_by(Post.date.desc()):    
        date = str(post.day)+"/"+str(post.month)+"/"+str(post.year)
        url = "http://flyingsparx.net/post/"+str(post.year)+"/"+str(post.month)+"/"+str(post.day)
        postList.append({'post':{'title':post.title, 'text':post.content, 'date':date, 'url':url}})
    return json.dumps(postList)

# Create a new post
def newPost(title, text, day, month, year):
    post_date = time.mktime((datetime.date(int(year), int(month), int(day))).timetuple())
    id = int(math.floor(time.time()))    
    post = Post(id,title,text,post_date,day,month,year)
    sess.add(post)
    sess.commit()

# Internally used to return a given post by ID
def getPostById(id):
    return sess.query(Post).filter_by(id=id).first()

# Edit a currently-existing post with new data
def updatePost(id, title, text, day, month, year):
    post = getPostById(id)
    post.title = title
    post.content = text
    post.day = day
    post.month = month
    post.year = year
    post.date = time.mktime((datetime.date(int(year), int(month), int(day))).timetuple())
    sess.commit()

# Delete a currently-existing post
def deletePost(id):
    post = getPostById(id)
    sess.delete(post)
    sess.commit()
