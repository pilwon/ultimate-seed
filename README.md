```sh
       _      _    _____   _   _       ____   _____   _____        ____   _____  _____  ____
      / \ /\ / \  /__ __\ / \ / \__/| /  _ \ /__ __\ /  __/       / ___\ /  __/ /  __/ /  _ \
      | | || | |    / \   | | | |\/|| | / \ |  / \   |  \  _____  |    \ |  \   |  \   | | \|
      | \_/| | |_/\ | |   | | | |  || | |-| |  | |   |  /_ \____\ \___ | |  /_  |  /_  | |_/|
      \____/ \____/ \_/   \_/ \_/  \| \_/ \ |  \_/   \____\       \____/ \____\ \____\ \____/

```

[![Screenshot](https://raw.github.com/pilwon/ultimate-seed/master/static/img/screenshot1.png)](http://ultimate-seed.herokuapp.com/)
[![Screenshot](https://raw.github.com/pilwon/ultimate-seed/master/static/img/screenshot2.png)](http://ultimate-seed.herokuapp.com/login)

#### [Demo hosted on Heroku](http://ultimate-seed.herokuapp.com/)

`ultimate-seed` is the ultimate full-stack AngularJS + Node.js/Express seed (batteries included!) that makes web developers insanely productive.

This project uses [ultimate](https://github.com/pilwon/node-ultimate) dependency library.



## Batteries Included

  `ultimate-seed` comes with many of popular, battle-tested modern web frameworks and libraries. All these parts are already wired together for you using best practices! :) Don't waste time writing boilerplate code.

  * [Angular](http://angularjs.org/)
  * [AngularUI](http://angular-ui.github.io/)
  * [Barbeque](https://github.com/pilwon/barbeque)
  * [Bootstrap](http://getbootstrap.com/)
  * [Bower](http://bower.io/)
  * [Browserify](https://github.com/substack/node-browserify)
  * [Express](http://expressjs.com/)
  * [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
  * [Grunt](http://gruntjs.com/)
  * [Handlebars](http://handlebarsjs.com/)
  * [jQuery](http://jquery.com/)
  * [JSHint](http://www.jshint.com/)
  * [Karma](http://karma-runner.github.io/) w/ [Mocha](http://visionmedia.github.io/mocha/)
  * [LESS](http://lesscss.org/) w/ [LESS Hat](http://lesshat.com/)
  * [Livereload](http://livereload.com/)
  * [Lodash](http://lodash.com/) ([Underscore](http://underscorejs.org/))
  * [Modernizr](http://modernizr.com/)
  * [MongoDB](http://www.mongodb.org/) w/ [Mongoose](http://www.mongoose.com/)
  * [Passport](http://passportjs.org/)
  * [Passport-Facebook](https://github.com/jaredhanson/passport-facebook)
  * [Passport-Google](https://github.com/jaredhanson/passport-google-oauth)
  * [Passport-Twitter](https://github.com/jaredhanson/passport-twitter)
  * [Redis](http://redis.io/) w/ [Hiredis](https://github.com/redis/hiredis)
  * [SocketIO](http://socket.io/)
  * [Source Maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
  * [Uglify](http://lisperator.net/uglifyjs/)
  * [Winston](https://github.com/flatiron/winston)



## How to Use


### Dependencies

| Dependency                                | Installation                                 |
|:------------------------------------------|:---------------------------------------------|
| [Node.js](http://nodejs.org/)             | [download](http://nodejs.org/download/)      |
| [MongoDB](http://www.mongodb.org/)        | [download](http://www.mongodb.org/downloads) |
| [Redis](http://redis.io/)                 | [download](http://redis.io/download)         |
| [Bower](http://twitter.github.com/bower/) | `npm install bower -g`                       |
| [Grunt](http://gruntjs.com/)              | `npm install grunt-cli -g`                   |

  Make sure both `MongoDB` and `Redis` servers running somewhere. (You can use free hosting services such as [MongoHQ](https://www.mongohq.com/) or [MongoLab](https://mongolab.com/) for `MongoDB` and [Redis To Go](http://redistogo.com/) or [RedisCloud](http://redis-cloud.com/) for `Redis`.) Then, update configuration information in `config/{development,production,staging}.json`.

  If you find any reason not to use `Redis` in your project, you can easily achieve it by following this instruction:

  1. Change the value of `session.store._use` to `mongo` in `config/{development,production,staging}.json`. (This lets `ultimate-seed` use MongoDB as session backend.)
  2. Comment out the line `ultimate.db.redis.connect(app.config.db.redis);` in `server/app.js`. (This prevents server connecting to `Redis` server.)


### Installation

#### Method 1: Yeoman Generator

  [Yeoman generator for ultimate-seed](https://github.com/pilwon/ultimate-seed-generator) can be used to clone the seed project.

    $ npm install -g yo
    $ npm install -g generator-ultimate
    $ yo ultimate

#### Method 2: Git Clone

  Download `ultimate-seed` and install dependency modules:

    $ git clone https://github.com/pilwon/ultimate-seed.git ultimate-seed
    $ cd ultimate-seed
    $ npm install && bower install

#### Method 3: Git Branch Tracking Remote

  Now create `seed` branch that tracks remote branch `ultimate-seed/master`:

    $ git remote add seed https://github.com/pilwon/ultimate-seed.git
    $ git fetch seed
    $ git checkout -b seed seed/master

  Merge `seed` to `master` branch by squashing commit log:

    $ git checkout master
    $ git merge seed
    $ npm install && bower install

  Resolve merge conflicts then push to `origin/master`:

    $ git push


### Development (`config/development.json`)

  [Grunt](http://gruntjs.com/) tasks to build your app:

    $ grunt                    # start server
    $ grunt build              # jshint & build
    $ grunt clean              # clean generated files

* If you see the `Could not load the bindings file.` error message, please perform `npm rebuild` then try again.


### Testing

#### Unit Testing with [Karma](https://github.com/karma-runner/karma)

  **TODO**

#### End-to-End (E2E) Testing with [Protractor](https://github.com/angular/protractor)

  Protractor wraps around [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs), which is a javascript binding for Selenium-Webdriver.

  > Selenium-Webdriver is a browser automation framework. Tests are written with the WebDriver API, which communicates with a Selenium server to control the browser under test. - [Protractor Getting Started Guide](https://github.com/angular/protractor/blob/master/docs/getting-started.md)

  Therefore, you need to first download and install Selenium standalone server. If you successfully performed `npm install`, you will have `./node_modules/.bin/webdriver-manager`. You can download and install Selenium standalone server by the following command:

    $ ./node_modules/.bin/webdriver-manager update

  From then on, you can start the server via:

    $ ./node_modules/.bin/webdriver-manager start

  You need to have the Selenium server running before running E2E tests. Once the Selenium server is running, you should also start the application server (in another tab) because your tests will run against it:

    $ grunt

  While the application server is running, open another tab and run e2e tests using Protractor.

    $ grunt test

  Enjoy watching your tests running inside a real browser (Chrome by default). If you'd like to change Protractor configuration, check out `config/test/protractor-e2e.conf.js`.

  ** TODO: Simplify the above steps so that it can be all done using one grunt command. **


### Deployment

#### Production/Staging Server (`config/{production|stging}.json`)

  First, prepare and optimize all files used in production/staging environment:

    $ grunt build

  Then your app can be started in production/staging mode using this command:

    $ NODE_ENV={production|staging} node server

  It is recommended to use a tool like [forever](https://github.com/nodejitsu/forever) to ensure your app running continuously:

    $ npm install forever -g
    $ NODE_ENV={production|staging} PORT=3000 forever start server

  You can alternatively use a system-wide process control system such as [Supervisor](http://supervisord.org/) with the following configuration (`supervisord.conf`):

    [program:ultimate-3000]
    directory = <absolute-path-of-project-root>
    environment = NODE_ENV={production|staging}, PORT=3000
    command = node server
    autostart = true
    autorestart = true


#### Heroku

  `ultimate-seed` supports deployment of your app to [Heroku](https://www.heroku.com/) servers.

  1. Modify `config/heroku.json`.
  2. Comment out the following lines in `.gitignore`.
    * `/.cachebust`
    * `/client/js/node_modules/bower_components/`
    * `/client-built/`
    * `/config/heroku.json`
    * `/node_modules/`
  3. Run `grunt build` to build the project.
  4. Commit all files to a local git repository created at the project root.
  5. Add git remote pointing to Heroku:
    * New Heroku app: `heroku create APPID`
    * Existing Heroku app: `heroku git:remote -a APPID`
  6. Set the environment variable: `heroku config:set NODE_ENV={production|staging} ERROR_PAGE_URL=http://APPID.herokuapp.com/404.html`
  7. Enable websocket support: `heroku labs:enable websockets`
  8. (Optional) Install MongoDB and Redis add-ons to the Heroku app. `ultimate-seed` reads environment variables attached by these add-ons. (Note: Add-on environment variables will override MongoDB/Redis configuration values in `config/heroku.json`):
    * Mongo: `heroku addons:add mongohq:sandbox` or `heroku addons:add mongolab:sandbox`
    * Redis: `heroku addons:add redistogo:nano` or `heroku addons:add rediscloud:20`
  9. Deploy application to Heroku using `git push heroku +master`
  10. Deployed at [http://APPID.herokuapp.com/](http://ultimate-seed.herokuapp.com/)


#### Using Docker Container

  1. Install [Docker](http://docker.io/).
  2. Download `ultimate-seed`: `git clone https://github.com/pilwon/ultimate-seed.git && cd $_`
  3. Build container: `docker build -t="<app-id>" .`
  4. Run the container: `CID=$(docker run -d -e NODE_ENV="production" <app-id>)`
  5. Check logs: `docker logs $CID`



### Using REPL (read-eval-print loop)

  This is helpful when you need to debug problems on the production server. You can connect to REPL of the running server via UNIX socket. By default, it creates UNIX socket at `/tmp/ultimate-repl.<PID>` but you can configure it in `config/{development,production,staging}.json`. In order to connect to it, simply run:

    $ nc -U /tmp/ultimate-repl.<PID>
    ultimate>

  or if you want readline's line editing and persistent history (i.e. using up/down arrow key to see the command history), then install rlwrap (on Mac, `brew install rlwrap`) and run:

    $ rlwrap nc -U /tmp/ultimate-repl.<PID>
    ultimate>

  Once you are connected, you can evaluate Javascript expression.

    ultimate> 3 + 3
    6
    ultimate>

  For your convenience, several variables/functions are exposed. Try the followings:

    ultimate> app  // ultimate app object
    ultimate> ld  // lodash (underscore) object (couldn't use _ because it has special meaning in REPL i.e. the result of the last expression)
    ultimate> ultimate  // ultimate object that ultimate-seed utilizes
    ultimate> showRoutes()  // shows an array of all routes (e.g. [ ..., 'GET /api/user/features/:id', ...])



## Directory Structure

<pre>
.
├── client/
│   ├── components/
│   ├── fonts/
│   │   ├── font-awesome/
│   │   └── glyphicons/
│   ├── js/
│   │   ├── {{module}}/
│   │   │   ├── controllers/
│   │   │   ├── directives/
│   │   │   ├── services/
│   │   │   ├── templates/
│   │   │   │   └── {{template}}.html
│   │   │   └── index.js
│   │   ├── node_modules/
│   │   │   ├── bower_components/
│   │   │   └── custom_components/
│   │   ├── app.js
│   │   └── index.js
│   └── less/
│       ├── _layouts/
│       ├── bootstrap/
│       ├── font-awesome/
│       ├── lesshat/
│       └── social-buttons/
├── config/
│   ├── server/
│   │   └── nginx.conf
│   ├── test/
│   │   ├── karma-e2e.conf.js
│   │   ├── karma-unit.conf.js
│   │   └── protractor-e2e.conf.js
│   ├── development.json
│   ├── production.json
│   └── staging.json
├── log/
├── node_modules/
├── server/
│   ├── controllers/
│   ├── lib/
│   ├── models/
│   ├── sockets/
│   ├── views/
│   │   ├── _helpers/
│   │   ├── _layouts/
│   │   │   └── default.hbs
│   │   ├── _partials/
│   │   │   └── livereload.hbs
│   │   ├── home/
│   │   ├── status/
│   │   └── empty.hbs
│   ├── app.js
│   ├── index.js
│   ├── routes.js
│   ├── socketio.js
│   └── winston.js
├── static/
│   ├── img/
│   ├── 404.html
│   ├── favicon.ico
│   └── robots.txt
├── worker/
│   ├── task/
│   ├── index.js
│   └── process.js
├── .bowerrc
├── .editorconfig
├── .jshintrc
├── .slugignore
├── Gruntfile.js
├── Procfile
├── bower.json
├── npm-scripts.js
├── package.json
└── project.json
</pre>



## FAQ

#### How do I fix the error `EMFILE: Too many opened files.`?

  This is an issue with [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch). You can fix it by increasing your system's max opened file limit. See [this answer](https://github.com/gruntjs/grunt-contrib-watch#how-do-i-fix-the-error-emfile-too-many-opened-files)
  NOTE: Even if `ulimit` command on the shell gives you 'unlimited', you might still need to increase the max opened file limit.

#### How do I fix `Error: Could not load the bindings file.`?

  If you are using node version manager [n](https://npmjs.org/package/n), you might come across the following error message when running `grunt`:

```
  Fatal error: Server ["/Users/username/path-to-ultimate-seed/server"] -  Error: Could not load the bindings file. Tried:
→ /Users/username/path-to-ultimate-seed/node_modules/bcrypt/build/bcrypt_lib.node
→ /Users/username/path-to-ultimate-seed/node_modules/bcrypt/build/Debug/bcrypt_lib.node
...
→ /Users/username/path-to-ultimate-seed/node_modules/bcrypt/build/default/bcrypt_lib.node
→ /Users/username/path-to-ultimate-seed/node_modules/bcrypt/compiled/0.10.23/darwin/x64/bcrypt_lib.node
```

  In order to fix it, run `npm rebuild`. Then you will be able to run `grunt` without seeing the above error message.



## Contributing to the Project

  We welcome your [pull requests](https://help.github.com/articles/using-pull-requests) to the `dev` branch.



## Credits

  * [Pilwon Huh](https://github.com/pilwon) (creator, maintainer)
  * [Brian Park](https://github.com/yaru22) (collaborator)

  Thanks to [all the other contributors](https://github.com/pilwon/ultimate-seed/graphs/contributors) as well! :)



## License

<pre>
The MIT License (MIT)

Copyright (c) 2012-2014 Pilwon Huh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre>

[![Analytics](https://ga-beacon.appspot.com/UA-47034562-1/ultimate-seed/readme?pixel)](https://github.com/pilwon/ultimate-seed)
