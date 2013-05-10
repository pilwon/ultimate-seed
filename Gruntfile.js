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
    bower: {  // grunt-bower-hooks
      all: {
        rjsConfig: '<%= project.path.client %>/js/main.js'
      }
    },
    clean: {  // grunt-contrib-clean
      dist: [
        '<%= project.path.temp %>',
        '<%= project.path.dist %>'
      ],
      server: [
        '<%= project.path.temp %>'
      ]
    },
    compass: {  // grunt-contrib-compass
      options: {
        sassDir: '<%= project.path.client %>/scss',
        cssDir: '<%= project.path.temp %>/css',
        imagesDir: '<%= project.path.client %>/img',
        javascriptsDir: '<%= project.path.client %>/js',
        importPath: '<%= project.path.bower %>',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
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
          '<%= project.path.dist %>/css/main.css': [
            '<%= project.path.temp %>/css/{,*/}*.css',
            '<%= project.path.client %>/css/{,*/}*.css'
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
        '<%= project.path.client %>/js/{,*/}*.js',
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
    requirejs: {  // grunt-requirejs
      dist: {
        // https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // `name` and `out` are set by grunt-usemin
          mainConfigFile: '<%= project.path.client %>/js/main.js',
          optimize: 'uglify',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true
        }
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
    watch: {  // grunt-regarde (task renamed from regarde to watch)
      'compass': {
        files: [
          '<%= project.path.client %>/scss/**/*.scss'
        ],
        tasks: ['compass']
      },
      'livereload-development': {
        files: [
          '<%= project.path.temp %>/css/**/*.css',
          '<%= project.path.client %>/**/*.html',
          '<%= project.path.client %>/{fonts,js,json}/**/*',
          '<%= project.path.client %>/img/{,*/}*.{png,jpg,jpeg}',
          '<%= project.path.server %>/**/*.html'
        ],
        tasks: ['livereload']
      },
      'livereload-production': {
        files: [
          '<%= project.path.dist %>/css/**/*.css',
          '<%= project.path.dist %>/**/*.html',
          '<%= project.path.dist %>/{fonts,js,json}/**/*',
          '<%= project.path.dist %>/img/{,*/}*.{png,jpg,jpeg}',
          '<%= project.path.server %>/**/*.html'
        ],
        tasks: ['livereload']
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('build', [
    'clean:dist',
    'compass:dist',
    'useminPrepare',
    // 'requirejs',
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
      'compass:server',
      'livereload-start',
      'express',
      'open'
    ]);
    if (process.env.NODE_ENV === 'heroku' || process.env.NODE_ENV === 'production') {
      grunt.task.run('watch:livereload-production');
    } else {
      grunt.task.run('watch');
    }
  });

  grunt.registerTask('test', [
    'jshint:all',
    'karma:multi'
  ]);

  // Shortcuts
  grunt.registerTask('b', 'default');
  grunt.registerTask('s', 'server');
  grunt.registerTask('t', 'test');

  grunt.registerTask('default', [
    'jshint:all',
    'karma:single',
    'build'
  ]);
};
