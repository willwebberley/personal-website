# Methods for blog support.
# Includes functionality for creating, editing, listing, deleting blog posts, etc.

import datetime, time, math, json
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///static/data/posts.db', echo=True)
Base = declarative_base()
Session = sessionmaker(bind=engine)
sess = Session()

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)
    date = Column(Integer)
    day = Column(Integer)
    month = Column(Integer)
    year = Column(Integer)

    def __init__(self,id,title,content,date,day,month,year):
        self.id = id
        self.title = title
        self.content = content
        self.date = date
        self.day = day
        self.month = month
        self.year = year
Base.metadata.create_all(engine)

def getPosts():
#    sess = Session()
    myList = []
    for instance in sess.query(Post).order_by(Post.date.desc()):
        myList.append(instance)
    return myList

def getPostByDate(year, month, day):
 #   sess = Session()
    return sess.query(Post).filter_by(year=int(year),month=int(month),day=int(day)).first()

def getPostsAsJSON():
  #  sess = Session()
    postList=[]
    for post in sess.query(Post).order_by(Post.date.desc()):    
        date = str(post.day)+"/"+str(post.month)+"/"+str(post.year)
        url = "http://flyingsparx.net/post/"+str(post.year)+"/"+str(post.month)+"/"+str(post.day)
        postList.append({'post':{'title':post.title, 'text':post.content, 'date':date, 'url':url}})
    return json.dumps(postList)

def newPost(title, text, day, month, year):
    post_date = time.mktime((datetime.date(year, month, day)).timetuple())
    id = int(math.floor(time.time()))    
    post = Post(id,title,text,post_date,day,month,year)
    print post 
   # sess = Session()
    sess.add(post)
    sess.commit()

def getPostById(id):
    #sess = Session()
    return sess.query(Post).filter_by(id=id).first()

def updatePost(id, title, text, day, month, year):
    #sess = Session()
    post = sess.query(Post).filter_by(id=id).first()
    post.title = title
    post.content = text
    post.day = day
    post.month = month
    post.year = year
    post.date = time.mktime((datetime.date(year, month, day)).timetuple())
    sess.commit()

def deletePost(id):
    post = getPostById2(id)
    #sess = Session()
    sess.delete(post)
    sess.commit()

