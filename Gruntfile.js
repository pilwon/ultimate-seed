/*
 * Gruntfile.js
 */

'use strict';

var path = require('path'),
    util = require('util');

var _ = require('lodash'),
    coffeeify = require('coffeeify'),
    hbsfy = require('hbsfy'),
    ngmin = require('ngmin'),
    rfileify = require('rfileify'),
    uglify = require('uglify-js'),
    wrench = require('wrench');

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
          bundle.transform(rfileify);
        }
      },
      dist: {
        entry: './<%= project.path.client %>/js/index.js',
        compile: '<%= project.path.dist %>/js/main.js',
        beforeHook: function (bundle) {
          bundle.transform(coffeeify);
          bundle.transform(hbsfy);
          bundle.transform(rfileify);
        },
        afterHook: function (source) {
          source = ngmin.annotate(source);
          source = uglify.minify(source, {
            fromString: true,
            mangle: false,
            output: {
              semicolons: true
            }
          }).code;
          return source;
        }
      }
    },
    cachebust: {
      dev: {
        files: {
          src: [
            '<%= project.path.temp %>/*.html'
          ]
        }
      },
      dist: {
        files: {
          src: [
            '<%= project.path.dist %>/*.html',
            '<%= project.path.server %>/views/_layouts/**/*.hbs'
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
              '*.html'
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
              'fonts/**/*'
            ]
          },
          {
            expand: true,
            cwd: '<%= project.path.client %>',
            dest: '<%= project.path.dist %>',
            src: [
              '*.html'
            ]
          }
        ]
      }
    },
    express: {  // grunt-express
      server: {
        options: {
          debug: true,
          livereload: project.server.livereload,
          port: '<%= process.env.PORT || project.server.port %>',
          server: path.resolve('<%= project.path.server %>')
        }
      }
    },
    htmlmin: {  // grunt-contrib-htmlmin
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.path.dist %>',
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
          dest: '<%= project.path.dist %>/img',
          src: '**/*.{gif,jpg,png}'
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
    karma: {  // grunt-karma
      single: {
        configFile: '<%= project.path.config %>/test/karma-unit.conf.js',
        singleRun: true
      },
      multi: {
        configFile: '<%= project.path.config %>/test/karma-unit.conf.js',
        singleRun: false
      },
      e2e: {
        configFile: '<%= project.path.config %>/test/karma-e2e.conf.js',
        singleRun: true
      }
    },
    less: {  // grunt-contrib-less
      dev: {
        options: {
          dumpLineNumbers: 'comments',
          paths: ['<%= project.path.client %>/less']
        },
        files: {
          '<%= project.path.temp %>/css/main.css': '<%= project.path.client %>/less/index.less',
          '<%= project.path.temp %>/css/static.css': '<%= project.path.client %>/less/_layouts/static/index.less'
        }
      },
      dist: {
        options: {
          paths: ['<%= project.path.client %>/less'],
          compress: true,
          yuicompress: true
        },
        files: {
          '<%= project.path.dist %>/css/main.css': '<%= project.path.client %>/less/index.less',
          '<%= project.path.dist %>/css/static.css': '<%= project.path.client %>/less/_layouts/static/index.less'
        }
      }
    },
    open: {  // grunt-open
      dev: {
        url: 'http://localhost:<%= process.env.PORT || project.server.port %>'
      }
    },
    protractor: {  // grunt-protractor-runner
      options: {
        keepAlive: true,
        noColor: false
      },
      e2e: {
        configFile: '<%= project.path.config %>/test/protractor-e2e.conf.js',
      }
    },
    uglify: {  // grunt-contrib-uglify
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
      html: ['<%= project.path.dist %>/*.html'],
      css: ['<%= project.path.dist %>/css/{,*/}*.css']
    },
    useminPrepare: {  // grunt-usemin
      options: {
        dest: '<%= project.path.dist %>'
      },
      html: '<%= project.path.client %>/*.html'
    },
    watch: {  // grunt-contrib-watch
      livereload: {
        options: {
          livereload: project.server.livereload
        },
        files: [
          '<%= project.path.client %>/fonts/{,*/}*',
          '<%= project.path.client %>/img/**/*.{gif,jpg,png}',
          '<%= project.path.server %>/views/**/*.hbs',
          '<%= project.path.static %>/**/*',
          '<%= project.path.temp %>/*.html',
          '<%= project.path.temp %>/css/{,*/}*.css',
          '<%= project.path.temp %>/js/{,*/}*.js'
        ]
      },
      html: {
        files: [
          '<%= project.path.client %>/*.html'
        ],
        tasks: [
          'copy:dev',
          'cachebust:dev'
        ]
      },
      less: {
        files: ['<%= project.path.client %>/less/**/*.less'],
        tasks: ['less:dev']
      },
      js: {
        files: [
          '<%= jshint.client %>',
          '<%= project.path.client %>/js/**/*.html',
          '!<%= project.path.client %>/js/bower_components/**/*.html'
        ],
        tasks: ['browserify2:dev']
      }
    }
  });

  grunt.registerTask('buildDev', [
    'clean:dev',
    'browserify2:dev',
    'less:dev',
    'copy:dev',
    'symlinkDev',
    'cachebust:dev'
  ]);

  grunt.registerTask('buildDist', [
    'jshint',
    'clean:dist',
    'browserify2:dist',
    'less:dist',
    'useminPrepare',
    'htmlmin:dist',
    'imagemin:dist',
    'copy:dist',
    'symlinkDist',
    'cachebust:dist',
    'usemin',
    'uglify:dist'
  ]);

  grunt.registerMultiTask('cachebust', function () {
    this.files.forEach(function (file) {
      file.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        var hash = '' + new Date().getTime(),
            data = grunt.file.read(filepath, { encoding: 'utf-8' });
        grunt.util._.each({
          js: {
            src: /<script.+src=['"](?!http:|https:|\/\/)([^"']+)["']/gm,
            file: /src=['"]([^"']+)["']/m
          },
          css: {
            src: /<link.+href=["'](?!http:|https:|\/\/).*\.css("|\?.*")/gm,
            file: /href=['"]([^"']+)["']/m
          },
          images: {
            src: /<img[^\>]+src=['"](?!http:|https:|\/\/|data:image)([^"']+)["']/gm,
            file: /src=['"]([^"']+)["']/m
          }
        }, function (regex) {
          if (/\.hbs$/.test(filepath)) { return; }
          var matches = data.match(regex.src) || [];
          if (matches.length) {
            console.log(matches);
          }
          matches.forEach(function (snippet) {
            snippet = snippet.substring(0, snippet.length - 1);
            data = data.replace(snippet, snippet.split('?')[0] + '?' + hash);
          });
        });
        if (!/\.hbs$/.test(filepath)) {
          grunt.file.write(filepath, data);
          grunt.log.writeln('"' + filepath + '" busted.');
        }
        // Save hash to file so express server can use the value.
        var cachebustData = {};
        try {
          cachebustData = grunt.file.readJSON('.cachebust');
        } catch (e) {}
        cachebustData[filepath] = hash;
        grunt.file.write('.cachebust', JSON.stringify(cachebustData, null, 2));
        grunt.log.writeln('".cachebust" updated.');
      });
    });
  });

  grunt.registerTask('symlinkDev', function () {
    ['fonts'].forEach(function (dir) {
      var symlinks = require(util.format('./%s/%s/.symlinks', project.path.client, dir));
      _.each(symlinks, function (source, target) {
        source = path.resolve(path.join(project.path.client, dir, source));
        target = path.resolve(path.join(project.path.temp, dir, target));
        wrench.mkdirSyncRecursive(path.join(project.path.temp, dir));
        wrench.copyDirSyncRecursive(source, target);
      });
      console.info('Resolved symlinks: %s', path.resolve(project.path.client, dir));
    });
  });

  grunt.registerTask('symlinkDist', function () {
    ['fonts'].forEach(function (dir) {
      var symlinks = require(util.format('./%s/%s/.symlinks', project.path.client, dir));
      _.each(symlinks, function (source, target) {
        source = path.resolve(path.join(project.path.client, dir, source));
        target = path.resolve(path.join(project.path.dist, dir, target));
        wrench.mkdirSyncRecursive(path.join(project.path.dist, dir));
        wrench.copyDirSyncRecursive(source, target);
      });
      console.info('Resolved symlinks: %s', path.resolve(project.path.dist, dir));
    });
  });

  grunt.registerTask('serverDev', function () {
    grunt.task.run([
      'express',
      'open'
    ]);
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
      grunt.task.run('watch');
    }
  });

  grunt.registerTask('build', 'buildDist');
  grunt.registerTask('test', [
    'jshint',
    'protractor'
    // 'karma:multi'
  ]);

  // Shortcuts
  grunt.registerTask('b', 'build');
  grunt.registerTask('c', 'clean');
  grunt.registerTask('d', 'buildDev');
  grunt.registerTask('s', 'serverDev');
  grunt.registerTask('t', 'test');

  // Default
  grunt.registerTask('default', ['buildDev', 'serverDev']);
};
