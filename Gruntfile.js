/*
 * Gruntfile.js
 */

'use strict';

var path = require('path');

var _ = require('lodash'),
    coffeeify = require('coffeeify'),
    hbsfy = require('hbsfy'),
    uglify = require('uglify-js');

var project = require('./project');

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('intern');

  // Project configuration.
  grunt.initConfig({
    project: project,
    browserify2: {  // grunt-browserify2
      dev: {
        entry: './<%= project.path.client %>/js/index.js',
        compile: '<%= project.path.temp %>/js/main.js',
        debug: true,
        beforeHook: function (bundle) {
          bundle.transform(coffeeify);
          bundle.transform(hbsfy);
        }
      },
      dist: {
        entry: './<%= project.path.client %>/js/index.js',
        compile: '<%= project.path.dist %>/js/main.js',
        beforeHook: function (bundle) {
          bundle.transform(coffeeify);
          bundle.transform(hbsfy);
        },
        afterHook: function (source) {
          return uglify.minify(source, { fromString: true }).code;
        }
      }
    },
    cacheBust: {
      dev: {
        files: {
          src: [
            '<%= project.path.temp %>/index.html'
          ]
        }
      },
      dist: {
        files: {
          src: [
            '<%= project.path.dist %>/index.html'
          ]
        }
      }
    },
    clean: {  // grunt-contrib-clean
      dev: [
        '<%= project.path.temp %>'
      ],
      dist: [
        '<%= project.path.dist %>'
      ]
    },
    copy: {  // grunt-contrib-copy
      dev: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: '<%= project.path.bower %>',
            dest: '<%= project.path.temp %>/js/vendor',
            src: [
              'es5-shim/es5-shim.js',
              'json3/lib/json3.js',
              'modernizr/modernizr.js'
            ]
          },
          {
            expand: true,
            cwd: '<%= project.path.client %>',
            dest: '<%= project.path.temp %>',
            src: [
              'index.html'
            ]
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: '<%= project.path.bower %>',
            dest: '<%= project.path.dist %>/js/vendor',
            src: [
              'es5-shim/es5-shim.js',
              'json3/lib/json3.js',
              'modernizr/modernizr.js'
            ]
          },
          {
            expand: true,
            cwd: '<%= project.path.client %>',
            dest: '<%= project.path.dist %>',
            src: [
              '../<%= project.path.bower %>/**/*',
              'fonts/**/*',
              '*.{ico,txt}'
            ]
          }
        ]
      }
    },
    cssmin: {  // grunt-contrib-cssmin
      options: {
        keepSpecialComments: 0
      },
      dist: {
        files: {
          '<%= project.path.dist %>/css/main.css': [
            '<%= project.path.temp %>/css/**/*.css',
            '<%= project.path.dist %>/css/**/*.css'
          ]
        }
      }
    },
    express: {  // grunt-express
      server: {
        options: {
          bases: [],
          debug: true,
          port: '<%= process.env.PORT || project.server.port %>',
          server: path.resolve('<%= project.path.server %>')
        }
      }
    },
    htmlmin: {  // grunt-contrib-htmlmin
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.path.client %>',
          src: [
            '*.html'
          ],
          dest: '<%= project.path.dist %>'
        }]
      }
    },
    imagemin: {  // grunt-contrib-imagemin
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.path.client %>/img',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= project.path.dist %>/img'
        }]
      }
    },
    intern: {  // intern
      client: {
        options: {
          config: 'test/intern'
        }
      },
      clientSuiteGet: {
        options: {
          config: 'test/intern',
          suites: ['test/lib/get']
        }
      },
      runner: {
        options: {
          config: 'test/intern',
          runType: 'runner'
        }
      }
    },
    jshint: {  // grunt-contrib-jshint
      options: {
        jshintrc: '.jshintrc'
      },
      client: [
        '<%= project.path.client %>/js/**/*.js',
        '!<%= project.path.client %>/js/node_modules/**/*.js',
        '<%= project.path.client %>/js/node_modules/*.js',
        '<%= project.path.client %>/node_modules/*.js',
      ],
      server: [
        '<%= project.path.server %>/**/*.js'
      ],
      grunt: [
        'Gruntfile.js'
      ]
    },
    less: {  // grunt-contrib-less
      dev: {
        options: {
          dumpLineNumbers: 'comments',
          paths: ['<%= project.path.client %>/less']
        },
        files: {
          '<%= project.path.temp %>/css/main.css': '<%= project.path.client %>/less/index.less'
        }
      },
      dist: {
        options: {
          paths: ['<%= project.path.client %>/less'],
          report: 'gzip',
          compress: true,
          yuicompress: true
        },
        files: {
          '<%= project.path.dist %>/css/main.css': '<%= project.path.client %>/less/index.less'
        }
      }
    },
    karma: {  // grunt-karma
      single: {
        configFile: '<%= project.path.config %>/karma-unit.conf.js',
        singleRun: true
      },
      multi: {
        configFile: '<%= project.path.config %>/karma-unit.conf.js',
        singleRun: false
      },
      e2e: {
        configFile: '<%= project.path.config %>/karma-e2e.conf.js',
        singleRun: true
      }
    },
    ngmin: {  // grunt-ngmin
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.path.dist %>/js',
          src: '*.js',
          dest: '<%= project.path.dist %>/js'
        }]
      }
    },
    open: {  // grunt-open
      dev: {
        url: 'http://localhost:<%= process.env.PORT || project.server.port %>'
      }
    },
    uglify: {  // grunt-contrib-uglify
      // TODO: Figure out a way to specify sourceMap option to grunt-usemin.
      dist: {
        files: _.transform({
          paths: _.map([
            'es5-shim.js',
            'json3.js',
            'modernizr.js'
          ], function (path) {
            return project.path.dist + '/js/vendor/' + path;
          })
        }, function (result, files) {
          _.assign(result, _.object(files, files));
        })
      }
    },
    usemin: {  // grunt-usemin
      options: {
        dirs: ['<%= project.path.dist %>']
      },
      html: ['<%= project.path.dist %>/**/*.html'],
      css: ['<%= project.path.dist %>/css/**/*.css']
    },
    useminPrepare: {  // grunt-usemin
      options: {
        dest: '<%= project.path.dist %>'
      },
      html: '<%= project.path.client %>/index.html'
    },
    watch: {  // grunt-contrib-watch
      assets: {
        options: {
          livereload: true
        },
        files: [
          '{<%= project.path.temp %>,<%= project.path.client %>}/{,*/}*.html',
          '!<%= project.path.client %>/index.html',
          '<%= project.path.client %>/img/{,*/}*.png',
          '<%= project.path.client %>/js/**/*.js',
          '<%= project.path.client %>/js/views/**/*.tmpl',
          '<%= project.path.server %>/views/{,*/}*.hbs'
        ]
      },
      html: {
        options: {
        },
        files: [
          '<%= project.path.client %>/index.html'
        ],
        tasks: [
          'copy:dev',
          'cacheBust:dev'
        ]
      },
      css: {
        options: {
          livereload: true
        },
        files: ['<%= project.path.temp %>/css/{,*/}*.css']
      },
      less: {
        options: {
        },
        files: ['<%= project.path.client %>/less/{,*/}*.less'],
        tasks: ['less:dev']
      },
      jsClient: {
        options: {
          livereload: true
        },
        files: [
          '<%= jshint.client %>',
          '<%= project.path.client %>/js/{handlebars/partials,modules/**}/*.hbs'
        ],
        tasks: ['browserify2:dev']
      },
      jsServer: {
        options: {
        },
        files: ['<%= jshint.server %>'],
        tasks: ['express']
      }
    }
  });


  grunt.registerTask('devBuild', [
    'clean:dev',
    'browserify2:dev',
    'less:dev',
    'copy:dev',
    'cacheBust:dev'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'browserify2:dist',
    'less:dist',
    'useminPrepare',
    'imagemin:dist',
    'htmlmin:dist',
    'cssmin:dist',
    'copy:dist',
    'cacheBust:dist',
    'usemin',
    'ngmin',
    'uglify:dist'
  ]);

  grunt.registerTask('devServer', function () {
    process.env.LIVERELOAD = 35729;
    grunt.task.run([
      'express',
      'open'
    ]);
    if (process.env.NODE_ENV !== 'heroku' && process.env.NODE_ENV !== 'production') {
      grunt.task.run('watch');
    }
  });

  grunt.registerTask('test', [
    'jshint:all',
    'karma:multi'
  ]);

  grunt.registerTask('develop', ['devBuild', 'devServer']);

  grunt.registerTask('test', ['intern:client']);

  // Shortcuts
  grunt.registerTask('b', 'build');
  grunt.registerTask('c', 'clean');
  grunt.registerTask('d', 'devBuild');
  grunt.registerTask('s', 'devServer');
  grunt.registerTask('t', 'test');

  // Default
  grunt.registerTask('default', 'develop');
};
