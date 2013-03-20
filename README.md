```sh
                _      _    _____   _   _       ____   _____   _____        ____   _____  _____  ____ 
               / \ /\ / \  /__ __\ / \ / \__/| /  _ \ /__ __\ /  __/       / ___\ /  __/ /  __/ /  _ \
               | | || | |    / \   | | | |\/|| | / \ |  / \   |  \  _____  |    \ |  \   |  \   | | \|
               | \_/| | |_/\ | |   | | | |  || | |-| |  | |   |  /_ \____\ \___ | |  /_  |  /_  | |_/|
               \____/ \____/ \_/   \_/ \_/  \| \_/ \ |  \_/   \____\       \____/ \____\ \____\ \____/
                                                                           
```

`ultimate-seed` is the ultimate full-stack seed that makes web developers insanely productive.

## What's Included?

  This seed integrates a bunch of popular modern web frameworks and libraries.

  * Angular
  * Bower
  * Bootstrap
  * Compass (SCSS)
  * Express
  * Grunt
  * Handlebars
  * jQuery
  * JSHint
  * Karma w/ Jasmine
  * Livereload
  * Lodash (Underscore)
  * Mocha
  * Modernizr
  * Mongoose
  * Redis
  * SocketIO
  * Uglify

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
    $ grunt clean               # clean dist/ and .tmp/

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

  `ultime-seed` is released under the MIT License.
