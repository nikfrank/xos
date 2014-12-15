see javascriptcurriculum.txt for current working copy

project structure::

"local dev copy"

/xos
  /xos-topic-name
   - git repo for topic
   + /tests .gitignored (also /talks if present)
   /tests
    - private repo of l-#-lname/t-#-tname/ [test.js, walkthrough.html]
  
  /app
   - publicly available angular application (uncompiled)

  /prod
   - compiled by gulp production copy (linked to heroku)

   worker.js
    - local drone for commands and file xfer from website

    test.js
     - phantom script for running code tests

"student copy"

/xss
  /xos-topic-name
   - publicly available git repo + branches made by website

  worker.js
   - drone (symlink in dev)

  test.js
   - phantom testrunner (symlink in dev)

  node_modules from install

====

fix:

todo:

  chat topic-scratch

  batch import tests/walkthrough
  replace save with diffsave, chat diff passing
  teacher view (view domsnap in chat)
  check test sha1sum on upload
 
doing:

  js-lang lessons
  html lessons

  angular app (exercise scheduler)

done:

  (commands for windows)

  new thread, list students, live chat
  list topics, list branches (lessons) per topic, pick lesson, render walkthrough, open local copy
  work branches, save copy, revert lesson, load copy, download topic
  test uploader, view screen grab
  upload test result before snap
  update topic, login w fb, chat with teacher (rough)
  threads by topic/lesson
  install/update topic
  ((check git status inside folders))
  onboard process for test users
  chat, usrs, topics, cmd service
  display names on work screen

  dup usr bug
