```sh
       _      _    _____   _   _       ____   _____   _____        ____   _____  _____  ____ 
      / \ /\ / \  /__ __\ / \ / \__/| /  _ \ /__ __\ /  __/       / ___\ /  __/ /  __/ /  _ \
      | | || | |    / \   | | | |\/|| | / \ |  / \   |  \  _____  |    \ |  \   |  \   | | \|
      | \_/| | |_/\ | |   | | | |  || | |-| |  | |   |  /_ \____\ \___ | |  /_  |  /_  | |_/|
      \____/ \____/ \_/   \_/ \_/  \| \_/ \ |  \_/   \____\       \____/ \____\ \____\ \____/
                                                                           
```

[![NPM](https://nodei.co/npm/ultimate-seed.png?downloads=false&stars=false)](https://npmjs.org/package/ultimate-seed)
[![NPM](https://nodei.co/npm-dl/ultimate.png?months=8)](https://npmjs.org/package/ultimate-seed)

#### [Demo hosted on Heroku](http://ultimate-seed.herokuapp.com/)

[![Screenshot](https://raw.github.com/pilwon/ultimate-seed/master/client/img/screenshot1.png)](http://ultimate-seed.herokuapp.com/)
[![Screenshot](https://raw.github.com/pilwon/ultimate-seed/master/client/img/screenshot2.png)](http://ultimate-seed.herokuapp.com/login)

`ultimate-seed` is the ultimate full-stack Node.js seed (batteries included!) that makes web developers insanely productive.

This project uses [ultimate](https://github.com/pilwon/node-ultimate) dependency library.



## Batteries Included

  `ultimate-seed` comes with many of popular, battle-tested modern web frameworks and libraries. All these parts are already wired together for you using best practices! :) Don't waste time writing boilerplate code.

  * [Backbone](http://backbonejs.org/)
  * [Backbone.Marionette](http://marionettejs.com/)
  * [Bootstrap](http://getbootstrap.com/)
  * [Bower](http://twitter.github.com/bower/)
  * [Browserify](https://github.com/substack/node-browserify)
  * [Express](http://expressjs.com/)
  * [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
  * [Grunt](http://gruntjs.com/)
  * [Handlebars](http://handlebarsjs.com/)
  * [jQuery](http://jquery.com/)
  * [JSHint](http://www.jshint.com/)
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

  Make sure both `MongoDB` and `Redis` servers running somewhere. (You can use free hosting services such as [MongoHQ](https://www.mongohq.com/) or [MongoLab](https://mongolab.com/) for `MongoDB` and [Redis To Go](http://redistogo.com/) or [RedisCloud](http://redis-cloud.com/) for `Redis`.) Then, update configuration information in `config/{development,heroku,production}.json`.

  If you find any reason not to use `Redis` in your project, you can easily achieve it by following this instruction:

  1. Change the value of `session.store._use` to `mongo` in `config/{development,heroku,production}.json`. (This lets `ultimate-seed` use MongoDB as session backend.)
  2. Comment out the line `ultimate.db.redis.connect(app.config.db.redis);` in `server/app.js`. (This prevents server connecting to `Redis` server.)


### Installation

#### Method 1: Yeoman Generator

  [Yeoman generator for ultimate-seed](https://github.com/pilwon/ultimate-seed-generator) can be used to clone the seed project.

    $ npm install -g yo
    $ npm install -g generator-ultimate
    $ yo ultimate
    $ npm install && bower install

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

  Push a copy of `seed` to `origin/seed`:

    $ git push origin seed

  Merge `seed` to `master` branch:

    $ git checkout master
    $ git merge seed
    $ npm install && bower install

  Resolve merge conflicts then push to `origin/master`:

    $ git push


### Development (`config/development.json`)

  [Grunt](http://gruntjs.com/) tasks to build your app:

    $ grunt                    # start server
    $ grunt build              # jshint & build
    $ grunt clean              # clean grenerated files



### Deployment


#### Production Server (`config/production.json`)

  First, prepare and optimize all files used in production environment:

    $ grunt build

  Then your app can be started in production mode using this command:

    $ NODE_ENV=production node server

  It is recommended to use a tool like [forever](https://github.com/nodejitsu/forever) to ensure your app running continuously:

    $ npm install forever -g
    $ NODE_ENV=production PORT=3000 forever start server

  You can alternatively use a system-wide process control system such as [Supervisor](http://supervisord.org/) with the following configuration (`supervisord.conf`):

    [program:ultimate-3000]
    directory = <absolute-path-of-project-root>
    environment = NODE_ENV=production, PORT=3000
    command = node server
    autostart = true
    autorestart = true


#### Heroku (`config/heroku.json`)

  `ultimate-seed` supports deployment of your app to [Heroku](https://www.heroku.com/) servers.

  1. Modify `config/heroku.json`.
  2. Comment out the following lines in `.gitignore`.
    * `/client/js/node_modules/bower_components/`
    * `/client-built/`
    * `/config/heroku.json`
    * `/node_modules/`
  3. Run `grunt build` to build the project.
  4. Commit all files to a local git repository created at the project root.
  5. Add git remote pointing to Heroku:
    * New Heroku app: `heroku create APPID`
    * Existing Heroku app: `heroku git:remote -a APPID`
  6. Set the environment variable: `heroku config:set NODE_ENV=heroku ERROR_PAGE_URL=http://APPID.herokuapp.com/404.html`
  7. (Optional) Install MongoDB and Redis add-ons to the Heroku app. `ultimate-seed` reads environment variables attached by these add-ons. (Note: Add-on environment variables will override MongoDB/Redis configuration values in `config/heroku.json`):
    * Mongo: `heroku addons:add mongohq:sandbox` or `heroku addons:add mongolab:sandbox`
    * Redis: `heroku addons:add redistogo:nano` or `heroku addons:add rediscloud:20`
  8. Deploy application to Heroku using `git push heroku +master`
  9. Deployed at [http://APPID.herokuapp.com/](http://ultimate-seed.herokuapp.com/)



## Using REPL (read-eval-print loop)

  This is helpful when you need to debug problems on the production server. You can connect to REPL of the running server via UNIX socket. By default, it creates UNIX socket at /tmp/ultimate-repl but you can configure it in `config/{development,heroku,production}.json`. In order to connect to it, simply run:
  
    $ nc -U /tmp/ultimate-repl
    ultimate>
    
  or if you want readline's line editing and persistent history (i.e. using up/down arrow key to see the command history), then install rlwrap (on Mac, `brew install rlwrap`) and run:
  
    $ rlwrap nc -U /tmp/ultimate-repl
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
│   │   └── font-awesome/
│   ├── img/
│   ├── js/
│   │   ├── entities/
│   │   │   └── config.js
│   │   ├── handlebars/
│   │   │   ├── helpers/
│   │   │   └── partials/
│   │   ├── lib/
│   │   ├── modules/
│   │   │   ├── {{module}}/
│   │   │   │   └── {{action}}/
│   │   │   │       ├── templates/
│   │   │   │       ├── controller.js
│   │   │   │       └── views.js
│   │   │   └── ...
│   │   ├── node_modules/
│   │   │   ├── bower_components/
│   │   │   └── custom_components/
│   │   ├── setup/
│   │   │   └── backbone/
│   │   │       └── marionette/
│   │   ├── test/
│   │   ├── app.js
│   │   └── index.js
│   ├── less/
│   │   ├── bootstrap/
│   │   ├── font-awesome/
│   │   ├── lesshat/
│   │   └── social-buttons/
│   ├── 404.html
│   ├── favicon.ico
│   ├── index.html
│   └── robots.txt
├── config/
│   ├── development.json
│   ├── heroku.json
│   ├── nginx.conf
│   └── production.json
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
│   │   ├── _partials/
│   │   ├── account/
│   │   ├── admin/
│   │   └── auth/
│   ├── app.js
│   ├── index.js
│   ├── routes.js
│   ├── socketio.js
│   └── winston.js
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



## Credits

  * [Pilwon Huh](https://github.com/pilwon) (creator, maintainer)
  * [Brian Park](https://github.com/yaru22) (collaborator)

  Thanks to [all the other contributors](https://github.com/pilwon/ultimate-seed/graphs/contributors) as well! :)



## License

<pre>
The MIT License (MIT)

Copyright (c) 2012-2013 Pilwon Huh

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
