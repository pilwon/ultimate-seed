```sh
                _      _    _____   _   _       ____   _____   _____        ____   _____  _____  ____ 
               / \ /\ / \  /__ __\ / \ / \__/| /  _ \ /__ __\ /  __/       / ___\ /  __/ /  __/ /  _ \
               | | || | |    / \   | | | |\/|| | / \ |  / \   |  \  _____  |    \ |  \   |  \   | | \|
               | \_/| | |_/\ | |   | | | |  || | |-| |  | |   |  /_ \____\ \___ | |  /_  |  /_  | |_/|
               \____/ \____/ \_/   \_/ \_/  \| \_/ \ |  \_/   \____\       \____/ \____\ \____\ \____/
                                                                           
```

`ultimate-seed` is the ultimate JavaScript/Node.js full-stack seed that makes web developers insanely productive.

This project uses [ultimate](https://github.com/pilwon/ultimate) dependency library.

## What's Included?

  This seed integrates a bunch of popular modern web frameworks and libraries.

  * [Backbone](http://backbonejs.org/)
  * [Bower](http://twitter.github.com/bower/)
  * [Bootstrap](http://twitter.github.com/bootstrap/)
  * [Compass](http://compass-style.org/) ([SCSS](http://sass-lang.com/))
  * [Express](http://expressjs.com/)
  * [Grunt](http://gruntjs.com/)
  * [Handlebars](http://handlebarsjs.com/)
  * [jQuery](http://jquery.com/)
  * [JSHint](http://www.jshint.com/)
  * [Karma](http://karma-runner.github.com/)
  * [Livereload](http://livereload.com/)
  * [Lodash](http://lodash.com/) ([Underscore](http://underscorejs.org/))
  * [Marionette](http://marionettejs.com/)
  * [Mocha](http://visionmedia.github.com/mocha/) w/ [Chai](http://chaijs.com/)
  * [Modernizr](http://modernizr.com/)
  * [MongoDB](http://www.mongodb.org/) w/ [Mongoose](http://www.mongoose.com/)
  * [Passport](http://passportjs.org/)
  * [Passport-Facebook](https://github.com/jaredhanson/passport-facebook)
  * [Passport-Google](https://github.com/jaredhanson/passport-google-oauth)
  * [Passport-Twitter](https://github.com/jaredhanson/passport-twitter)
  * [Redis](http://redis.io/) w/ [Hiredis](https://github.com/redis/hiredis)
  * [RequireJS](http://requirejs.org/)
  * [SocketIO](http://socket.io/)
  * [Uglify](http://lisperator.net/uglifyjs/)

## How to Use

  First of all, you need the following dependencies:

| Dependency                                | Installation                                 |
|:------------------------------------------|:---------------------------------------------|
| [Node.js](http://nodejs.org/)             | [download](http://nodejs.org/download/)      |
| [MongoDB](http://www.mongodb.org/)        | [download](http://www.mongodb.org/downloads) |
| [Redis](http://redis.io/)                 | [download](http://redis.io/download)         |
| [Bower](http://twitter.github.com/bower/) | `npm install bower -g`                       |
| [Compass](http://compass-style.org/)      | `gem install compass`                        |
| [Grunt](http://gruntjs.com/)              | `npm install grunt-cli -g`                   |

  Then, make sure `MongoDB` server is running somewhere (or use free services such as [MongoHQ](https://www.mongohq.com/) or [MongoLab](https://mongolab.com/)). Update configuration information in `config/{development,production}.json`.

  `Redis` server is optional but it is highly recommended. Modify *session.store._use* variable as well as Redis connection information in the configuration file if you wish to use Redis as session backend. There is also a free Redis hosting provider, [Redis To Go](http://redistogo.com/).

  Now run the following commands to download `ultimate-seed` and its dependencies:

    $ git clone https://github.com/pilwon/ultimate-seed.git
    $ cd ultimate-seed
    $ npm install && bower install

  Finally, use the following commands to start, build, and deploy your app:

    $ grunt server                          # start server
    $ grunt                                 # jshint & build
    $ grunt clean                           # clean grenerated files
    $ NODE_ENV=production node server       # run server in production mode

  You need to run `grunt` before starting app in production environment.

### Deployment to Heroku

  `ultimate-seed` supports deployment of your app to [Heroku](https://www.heroku.com/) servers.

  1. Run `grunt` to build the project.
  2. Comment out all entries in `.gitignore` (or temporarily hide/remove this file)
  3. Commit all files to a local git repository created at the project root.
  4. Add git remote pointing to Heroku:
    * New Heroku app: `heroku create APP_NAME`
    * Existing Heroku app: `heroku git:remote -a APP_NAME`
  5. Set the environment variable: `NODE_ENV=heroku`
  6. Deploy application to Heroku using `git push heroku +master`

## Directory Structure

```
.
├── client/
│   ├── components/
│   ├── img/
│   ├── js/
│   │   ├── collections/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── nls/
│   │   ├── routers/
│   │   ├── templates/
│   │   │   ├── _helpers/
│   │   │   ├── _i18n/
│   │   │   └── _partials/
│   │   ├── vendor/
│   │   └── views/
│   ├── scss/
│   │   └── sass-bootstrap/
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
│   │   ├── _errors/
│   │   ├── _helpers/
│   │   ├── _layouts/
│   │   ├── _partials/
│   │   ├── account/
│   │   ├── admin/
│   │   └── auth/
│   ├── app.js
│   ├── index.js
│   ├── routes.js
│   └── socketio.js
├── .bowerrc
├── .editorconfig
├── .jshintrc
├── .slugignore
├── Gruntfile.js
├── component.json
├── npm-scripts.js
├── package.json
└── project.json
```

## Screenshot

![screenshot](https://raw.github.com/pilwon/ultimate-seed/master/client/img/screenshot.png)

## License

  `ultimate-seed` is released under the MIT License.
