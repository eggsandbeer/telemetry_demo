## Hello Telemetry!
Here is my demo app following your instructions. It's a node app, so before you do anything, be sure to run `npm install` from the command line before you take any of these steps below. You'll need to install the gulp-cli package globally too on your box, so you can run gulp commands from the cl.

#### Prod version
To run the production version of this app, just run `gulp build` and then navigate to localhost:3000 to see the app in your browser. Should be that easy.

#### Dev version
The default gulp task, `gulp`, is set to launch the dev version of the app. There's a bug there I should have solved where, after running `gulp` you have to actually make a change to the dev js files and save before the app is properly served up. Annoying, but didn't have time to solve. Should be a pretty easy fix.

#### Running Tests.
This is a very quick and dirty implementation of my unit tests. They aren't hooked into the gulp process at all (aside from the test watchers to rebuild them) and don't do things like generate XML files, throw console warnings, etc and could use some more organization. There's just a simple html jasmine testrunner that you can run by setting up a server from the test directory. I was using `python -m SimpleHTTPServer `. The test rebundler is run along with the default gulp task, so that TDD is possible. As stated during the interview, I strongly believe in the importance of testing an app, whether with units tests or functional tests or with UI regression tests. I simply just felt I'd spent enough time on building out this app and have other responsibilities.
