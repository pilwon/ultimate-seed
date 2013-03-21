```sh
                _      _    _____   _   _       ____   _____   _____        ____   _____  _____  ____ 
               / \ /\ / \  /__ __\ / \ / \__/| /  _ \ /__ __\ /  __/       / ___\ /  __/ /  __/ /  _ \
               | | || | |    / \   | | | |\/|| | / \ |  / \   |  \  _____  |    \ |  \   |  \   | | \|
               | \_/| | |_/\ | |   | | | |  || | |-| |  | |   |  /_ \____\ \___ | |  /_  |  /_  | |_/|
               \____/ \____/ \_/   \_/ \_/  \| \_/ \ |  \_/   \____\       \____/ \____\ \____\ \____/
                                                                           
```

`ultimate-seed` is the ultimate full-stack seed that makes web developers insanely productive.

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

## Creating New Project

  Download and install dependencies:

    $ git clone https://github.com/pilwon/ultimate-seed.git
    $ cd ultimate-seed
    $ npm install && bower install

## Grunt Tasks

  Available commands:

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
├── config/
│   ├── development.json
│   ├── karma.conf.js
│   ├── production.json
├── node_modules/
├── server/
│   ├── controllers/
│   ├── helpers/
│   ├── lib/
│   ├── models/
│   ├── partials/
│   └── views/
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

## License

  `ultimate-seed` is released under the MIT License.
