see javascriptcurriculum.txt for current working copy

project structure::

"local dev copy"

/xos
  /xos-topic-name
   - git repo for topic
   + /tests .gitignored
  
  /app
   - publicly available angular application

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

====

fix:

todo:

  (commands for windows)
  batch import tests/walkthrough
  angular lessons to build finance & business app // exercise schedule
  replace save with diffsave, chat diff passing
  teacher view (view domsnap in chat)
  check test sha1sum on upload
 
doing:

  js-lang lessons

done:

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
