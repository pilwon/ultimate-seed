```sh
       _      _    _____   _   _       ____   _____   _____        ____   _____  _____  ____ 
      / \ /\ / \  /__ __\ / \ / \__/| /  _ \ /__ __\ /  __/       / ___\ /  __/ /  __/ /  _ \
      | | || | |    / \   | | | |\/|| | / \ |  / \   |  \  _____  |    \ |  \   |  \   | | \|
      | \_/| | |_/\ | |   | | | |  || | |-| |  | |   |  /_ \____\ \___ | |  /_  |  /_  | |_/|
      \____/ \____/ \_/   \_/ \_/  \| \_/ \ |  \_/   \____\       \____/ \____\ \____\ \____/
                                                                           
```

[![NPM](https://nodei.co/npm/ultimate-seed.png?downloads=false&stars=false)](https://npmjs.org/package/ultimate-seed)
[![NPM](https://nodei.co/npm-dl/ultimate.png?months=9)](https://npmjs.org/package/ultimate-seed)

#### [Demo hosted on Heroku](http://ultimate-seed.herokuapp.com/)

[![Screenshot](https://raw.github.com/pilwon/node-ultimate-seed/master/client/img/screenshot1.png)](http://ultimate-seed.herokuapp.com/)
[![Screenshot](https://raw.github.com/pilwon/node-ultimate-seed/master/client/img/screenshot2.png)](http://ultimate-seed.herokuapp.com/)

`ultimate-seed` is the ultimate JavaScript/Node.js full-stack seed that makes web developers insanely productive.

This project uses [ultimate](https://github.com/pilwon/node-ultimate) dependency library.

## What's Included?

  This seed integrates a bunch of popular modern web frameworks and libraries.

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
| [Compass](http://compass-style.org/)      | `gem install compass`                        |
| [Grunt](http://gruntjs.com/)              | `npm install grunt-cli -g`                   |

  Make sure `MongoDB` server is running somewhere (or use free services such as [MongoHQ](https://www.mongohq.com/) or [MongoLab](https://mongolab.com/)). Update configuration information in `config/{development,heroku,production}.json`.

  `Redis` server is optional but it is highly recommended. Modify *session.store._use* variable as well as Redis connection information in the configuration file if you wish to use Redis as session backend. There is also a free Redis hosting provider, [Redis To Go](http://redistogo.com/).

### Installation

  Download `ultimate-seed` and install dependency modules:

    $ git clone https://github.com/pilwon/node-ultimate-seed.git ultimate-seed
    $ cd ultimate-seed
    $ npm install && bower install

  Alternatively, [Yeoman generator for ultimate-seed](https://github.com/pilwon/node-ultimate-seed-generator) can be used to clone the seed project.

### Development (`config/development.json`)

  [Grunt](http://gruntjs.com/) tasks to build your app:

    $ grunt                    # start server
    $ grunt build              # jshint & build
    $ grunt clean              # clean grenerated files

## Deployment

### Production Server (`config/production.json`)

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

### Heroku (`config/heroku.json`)

  `ultimate-seed` supports deployment of your app to [Heroku](https://www.heroku.com/) servers.

  1. Comment out the following lines in `.gitignore`.
    * `/client-built/`
    * `/config/heroku.json`
    * `node_modules/`
    * `/client/js/node_modules/bower_components`
  2. Run `grunt build` to build the project.
  3. Commit all files to a local git repository created at the project root.
  4. Add git remote pointing to Heroku:
    * New Heroku app: `heroku create APPID`
    * Existing Heroku app: `heroku git:remote -a APPID`
  5. Set the environment variable: `heroku config:set NODE_ENV=heroku ERROR_PAGE_URL=http://APPID.herokuapp.com/404.html -a APPID`
  6. Deploy application to Heroku using `git push heroku +master`
  7. Deployed at [http://APPID.herokuapp.com/](http://ultimate-seed.herokuapp.com/)

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

```
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
│   └── production.json
├── node_modules/
├── server/
│   ├── controllers/
│   ├── lib/
│   ├── models/
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
```

## Credits

  See the [contributors](https://github.com/pilwon/node-ultimate-seed/graphs/contributors).

## License

  `ultimate-seed` is released under the [MIT License](http://opensource.org/licenses/MIT).
