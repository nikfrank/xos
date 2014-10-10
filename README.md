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

  ((check git status inside folders))
  install/update topic

todo:

  onboard process for test users
  batch import tests/walkthrough
  chat, usrs, topics, cmd services (commands for windows)
  js-lang lessons
  angular lessons to build finance & business app
  check test sha1sum on upload
 

done:

  teacher view (view domsnap in chat)
  new thread, list students, live chat
  list topics, list branches (lessons) per topic, pick lesson, render walkthrough, open local copy
  work branches, save copy, revert lesson, load copy, download topic
  test uploader, view screen grab
  upload test result before snap
  update topic, login w fb, chat with teacher (rough)
  threads by topic/lesson