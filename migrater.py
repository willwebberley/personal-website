# Script to migrate DB-managed blog posts into markdown files

import sqlite3

con = sqlite3.connect('static/data/posts.db')
c = con.cursor()
posts = c.execute('select * from posts').fetchall()

for post in posts:
  try:
    year = str(post[6])
    if '20' not in year:
      year = '20' + year
    file = open('posts/' + year + '-'+str(post[5])+'-'+str(post[4])+'-'+post[1].lower().replace(' ', '-').replace("'",'').replace(':', '')+'.md', 'w')
    file.write('---\nyear: '+year+'\nmonth: '+str(post[5])+'\nday: '+str(post[4])+'\ntitle: '+post[1]+'\n---\n\n'+post[2].replace("\r", "").decode("latin1").encode("utf8"))
    file.close()
  except Exception as e:
    print(e)
    print(post[1])
