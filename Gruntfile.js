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
            dot: true,
            expand: true,
            flatten: true,
            cwd: '<%= project.path.bower %>',
            dest: '<%= project.path.temp %>/js/vendor',
            src: [
              'es5-shim/es5-shim.js',
              'json3/lib/json3.js',
              'modernizr/modernizr.js'
            ]
          }
        ]
      },
      dist: {
        files: [
          {
            dot: true,
            expand: true,
            cwd: '<%= project.path.client %>',
            dest: '<%= project.path.dist %>',
            src: [
              '../<%= project.path.bower %>/**/*',
              '../<%= project.path.bower %>/**/*',
              'fonts/**/*',
              'json/**/*.json',
              '*.{ico,txt}'
            ]
          },
          {
            dot: true,
            expand: true,
            flatten: true,
            cwd: '<%= project.path.bower %>',
            dest: '<%= project.path.dist %>/js/vendor',
            src: [
              'es5-shim/es5-shim.js',
              'json3/lib/json3.js',
              'modernizr/modernizr.js'
            ]
          }
        ]
      }
    },
    cssmin: {  // grunt-contrib-cssmin
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
      livereload: {
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
    jshint: {  // grunt-contrib-jshint
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= project.path.client %>/js/**/*.js',
        '!<%= project.path.client %>/js/node_modules/**/*.js',
        '<%= project.path.client %>/js/node_modules/*.js',
        '<%= project.path.client %>/node_modules/*.js',
        '<%= project.path.server %>/**/*.js'
      ]
    },
    less: {
      dev: {
        options: {
          paths: ['<%= project.path.client %>/less']
        },
        files: {
          '<%= project.path.temp %>/css/main.css': '<%= project.path.client %>/less/index.less'
        }
      },
      dist: {
        options: {
          paths: ['<%= project.path.client %>/less'],
          compress: true,
          yuicompress: true
        },
        files: {
          '<%= project.path.dist %>/css/main.css': '<%= project.path.client %>/less/index.less'
        }
      }
    },
    open: {  // grunt-open
      dev: {
        url: 'http://localhost:<%= process.env.PORT || project.server.port %>'
      }
    },
    uglify: {
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
          interrupt: true,
          livereload: true
        },
        files: [
          '<%= project.path.temp %>/css/**/*.css',
          '<%= project.path.client %>/**/*.html',
          '<%= project.path.client %>/**/*.hbs',
          '<%= project.path.client %>/{fonts,js,json}/**/*',
          '<%= project.path.client %>/img/**/*.{png,jpg,jpeg}',
          '<%= project.path.server %>/**/*.hbs'
        ]
      },
      css: {
        options: {
          livereload: true
        },
        files: ['<%= project.path.temp %>/css/**/*.css']
      },
      less: {
        options: {
          interrupt: true
        },
        files: ['<%= project.path.client %>/less/**/*.less'],
        tasks: ['less:dev']
      },
      js: {
        options: {
          interrupt: true,
          livereload: true
        },
        files: ['<%= jshint.all %>'],
        tasks: ['browserify2:dev']
      },
      dist: {
        options: {
          interrupt: true,
          livereload: true
        },
        files: [
          '<%= project.path.dist %>/css/**/*.css',
          '<%= project.path.dist %>/**/*.html',
          '<%= project.path.dist %>/{fonts,js,json}/**/*',
          '<%= project.path.dist %>/img/**/*.{png,jpg,jpeg}',
          '<%= project.path.server %>/**/*.html'
        ]
      }
    }
  });

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
    'usemin',
    'uglify:dist'
  ]);

  grunt.registerTask('develop', function () {
    process.env.LIVERELOAD = 35729;
    grunt.task.run([
      'clean:dev',
      'browserify2:dev',
      'less:dev',
      'copy:dev',
      'express',
      'open'
    ]);
    if (process.env.NODE_ENV === 'heroku' || process.env.NODE_ENV === 'production') {
      grunt.task.run('watch:dist');
    } else {
      grunt.task.run('watch');
    }
  });

  // Shortcuts
  grunt.registerTask('b', 'build');
  grunt.registerTask('c', 'clean');

  // Default
  grunt.registerTask('default', 'develop');
};
