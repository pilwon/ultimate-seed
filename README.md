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

  * [Angular](http://angularjs.org/)
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
  * [Mocha](http://visionmedia.github.com/mocha/) w/ [Chai](http://chaijs.com/)
  * [Modernizr](http://modernizr.com/)
  * [MongoDB](http://www.mongodb.org/) w/ [Mongoose](http://www.mongoose.com/)
  * [Redis](http://redis.io/) w/ [Hiredis](https://github.com/redis/hiredis)
  * [SocketIO](http://socket.io/)
  * [Uglify](http://lisperator.net/uglifyjs/)

## How to Use

  First of all, you need the following dependencies:

| Dependency                                | Installation                                 |
|:------------------------------------------|:---------------------------------------------|
| [Bower](http://twitter.github.com/bower/) | `npm install bower -g`                       |
| [Compass](http://compass-style.org/)      | `gem install compass`                        |
| [Grunt](http://gruntjs.com/)              | `npm install grunt-cli -g`                   |
| [MongoDB](http://www.mongodb.org/)        | [download](http://www.mongodb.org/downloads) |
| [Node.js](http://nodejs.org/)             | [download](http://nodejs.org/download/)      |
| [Redis](http://redis.io/)                 | [download](http://redis.io/download)         |

  Then, make sure `MongoDB` server is running somewhere (or use free services such as [MongoHQ](https://www.mongohq.com/) or [MongoLab](https://mongolab.com/)). Update configuration information in `config/{development,production}.json`.

  `Redis` server is optional but it is highly recommended. Modify *session.store._use* variable as well as Redis connection information in the configuration file if you wish to use Redis as session backend. There is also a free Redis hosting provider, [Redis To Go](http://redistogo.com/).

  Now run the following commands to download `ultimate-seed` and its dependencies:

    $ git clone https://github.com/pilwon/ultimate-seed.git
    $ cd ultimate-seed
    $ npm install && bower install

  Finally, use the following commands to start, test, and build your app:

    $ grunt server              # start server
    $ grunt test                # run tests
    $ grunt                     # jshint, test, then build
    $ grunt clean               # clean grunt grenerated files

## Directory Structure

```
.
├── client/
│   ├── components/
│   ├── fonts/
│   ├── img/
│   ├── js/
│   │   ├── controllers/
│   │   ├── directives/
│   │   ├── filters/
│   │   ├── services/
│   │   └── vendor/
│   ├── scss/
│   └── tpl/
│       └── _partials/
├── config/
│   ├── development.json
│   ├── karma.conf.js
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
├── test/
│   ├── client/
│   │   ├── controllers/
│   │   ├── directives/
│   │   ├── filters/
│   │   └── services/
│   └── server/
├── .bowerrc
├── .editorconfig
├── .jshintrc
├── Gruntfile.js
├── component.json
├── package.json
└── project.json
```

## Screenshot

![screenshot](https://raw.github.com/pilwon/ultimate-seed/master/client/img/screenshot.png)

## License

  `ultimate-seed` is released under the MIT License.
