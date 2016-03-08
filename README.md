## Hello Telemetry!
Here is my demo app following your instructions. It's a Node/Express/React/Flux app. Before you do anything to start it up after checkout, be sure to run `npm install` from the command line before you take any of these steps below. You'll need to install the gulp-cli package globally too on your box, so you can run gulp commands from the cl.

#### Production version
To run the production version of this app, just run `gulp build` and then navigate to `localhost:3000` to see the app in your browser. Should be that easy.

#### Development version
The default gulp task, `gulp`, is set to launch the dev version of the app. There's a bug there I should have solved where, after running `gulp` you have to actually make a change to the dev js files and save before the app is properly served up. Annoying, but didn't have time to solve. Should be a pretty easy fix.

#### Running Tests.
This is a very quick and dirty implementation of my unit tests. They aren't hooked into the gulp process at all (aside from the test watchers to rebuild them) and don't do things like generate XML files, throw console warnings, etc and could use an organization overhaul. There's just a simple html jasmine testrunner that you can run by setting up a server from the test directory. I was using `python -m SimpleHTTPServer ` at `localhost:8000`. The test rebundler is run along with the default gulp task too, so that TDD is possible. As stated during the interview, I strongly believe in the importance of testing an app, whether with units tests or functional tests or with UI regression tests. This was actually the most tests I'd ever written for a React app. I'm just a lot more familiar with Karma and Angular tests than with testing through React, so this was a bit of a learning experience.


### Notes
I'm using the browser's local Storage option to store the auth information and then will check that info on page load to see if the 'session' is still valid. If you delete that `login_data` from local storage, then you should see a redirect from pages like loggedin back to the main login page. Thanks!
