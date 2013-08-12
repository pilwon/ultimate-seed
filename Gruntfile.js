/*
 * Gruntfile.js
 */

'use strict';

var path = require('path');

var project = require('./project');

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    project: project,
    clean: {  // grunt-contrib-clean
      dist: [
        '<%= project.path.temp %>',
        '<%= project.path.dist %>'
      ],
      server: [
        '<%= project.path.temp %>'
      ]
    },
    copy: {  // grunt-contrib-copy
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.path.client %>',
          dest: '<%= project.path.dist %>',
          src: [
            '../<%= project.path.bower %>/**/*',
            'fonts/**/*',
            'json/**/*.json',
            'views/**/*',
            '*.{ico,txt}'
          ]
        }]
      }
    },
    cssmin: {  // grunt-contrib-mincss
      dist: {
        files: {
          '<%= project.path.dist %>/css/app.css': [
            '<%= project.path.temp %>/css/{,*/}*.css',
            '<%= project.path.client %>/css/{,*/}*.css'
          ]
        }
      }
    },
    express: {  // grunt-express
      all: {
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
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= project.path.dist %>/img'
        }]
      }
    },
    jshint: {  // grunt-contrib-jshint
      options: {
        jshintrc: '.jshintrc'
      },
      server: [
        '<%= project.path.client %>/js/**/*.js',
        '!<%= project.path.client %>/js/vendor/**/*',
        '<%= project.path.server %>/**/*.js',
        '<%= project.path.test %>/server/**/*.js'
      ],
      all: [
        'Gruntfile.js',
        '<%= project.path.client %>/js/**/*.js',
        '!<%= project.path.client %>/js/vendor/**/*',
        '<%= project.path.server %>/**/*.js',
        '<%= project.path.test %>/client/**/*.js',
        '<%= project.path.test %>/server/**/*.js'
      ]
    },
    less: {  // grunt-contrib-less
      all: {
        options: {
          paths: [
            '<%= project.path.client %>/less',
            '<%= project.path.client %>/less/third-party'
          ],
          report: 'gzip'
        },
        files: {
          '<%= project.path.temp %>/css/app.css': '<%= project.path.client %>/less/app.less'
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
      server: {
        url: 'http://localhost:<%= process.env.PORT || project.server.port %>'
      }
    },
    uglify: {  // grunt-contrib-uglify
      dist: {
        // TODO: Figure out a way to specify sourceMap option to grunt-usemin.
        // files: {
        //   '<%= project.path.dist %>/js/app.js': [
        //     '<%= project.path.dist %>/js/app.js'
        //   ]
        // },
        // options: {
        //   sourceMap: '<%= project.path.dist %>/js/sourceMap.js'
        // }
      }
    },
    usemin: {  // grunt-usemin
      html: ['<%= project.path.dist %>/{,*/}*.html'],
      css: ['<%= project.path.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= project.path.dist %>']
      }
    },
    useminPrepare: {  // grunt-usemin
      html: '<%= project.path.client %>/index.html',
      options: {
        dest: '<%= project.path.dist %>'
      }
    },
    watch: {  // grunt-contrib-watch
      less: {
        files: ['<%= project.path.client %>/less/**/*.less'],
        tasks: ['less']
      },
      production: {
        files: [
          '<%= project.path.temp %>/css/**/*.css',
          '<%= project.path.client %>/**/*.html',
          '<%= project.path.client %>/{fonts,js,json}/**/*',
          '<%= project.path.client %>/img/{,*/}*.{png,jpg,jpeg}',
          '<%= project.path.server %>/**/*.html'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'less',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'usemin',
    'ngmin',
    'uglify'
  ]);

  grunt.registerTask('server', function () {
    process.env.LIVERELOAD = 35729;
    grunt.task.run([
      'jshint:server',
      'clean:server',
      'less',
      'express',
      'open'
    ]);
    if (process.env.NODE_ENV === 'heroku' || process.env.NODE_ENV === 'production') {
      grunt.task.run('watch:production');
    } else {
      grunt.task.run('watch');
    }
  });

  grunt.registerTask('test', [
    'jshint:all',
    'karma:multi'
  ]);

  // Shortcuts
  grunt.registerTask('b', 'build');
  grunt.registerTask('s', 'server');
  grunt.registerTask('t', 'test');

  grunt.registerTask('default', [
    'jshint:all',
    'karma:single',
    'build'
  ]);
};
