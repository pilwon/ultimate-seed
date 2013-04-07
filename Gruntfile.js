/*
 * Gruntfile.js
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    project: grunt.file.readJSON('project.json'),
    bower: {  // grunt-bower-hooks
      all: {
        rjsConfig: '<%= project.path.client %>/js/main.js'
      }
    },
    cdnify: {  // grunt-google-cdn
      dist: {
        html: ['<%= project.path.dist %>/*.html']
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
            '*.html',
            'views/*.html'
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
        configFile: '<%= project.path.config %>/karma.conf.js',
        singleRun: true
      },
      all: {
        configFile: '<%= project.path.config %>/karma.conf.js',
        singleRun: false
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
      dist: {}
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
          '<%= project.path.client %>/js/**/*.js',
          '<%= project.path.client %>/img/{,*/}*.{png,jpg,jpeg}',
          '<%= project.path.server %>/partials/**/*.html',
          '<%= project.path.server %>/views/**/*.html'
        ],
        tasks: ['livereload']
      },
      'livereload-production': {
        files: [
          '<%= project.path.dist %>/css/**/*.css',
          '<%= project.path.dist %>/**/*.html',
          '<%= project.path.dist %>/js/**/*.js',
          '<%= project.path.dist %>/img/{,*/}*.{png,jpg,jpeg}',
          '<%= project.path.server %>/partials/**/*.html',
          '<%= project.path.server %>/views/**/*.html'
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
    'requirejs',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'usemin'
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
    if (process.env.NODE_ENV === 'production') {
      grunt.task.run('watch:livereload-production');
    } else {
      grunt.task.run('watch');
    }
  });

  // grunt.registerTask('test', [
  //   'jshint:all',
  //   'karma:all'
  // ]);

  // Shortcuts
  grunt.registerTask('b', 'default');
  grunt.registerTask('s', 'server');
  // grunt.registerTask('t', 'test');

  grunt.registerTask('default', [
    'jshint:all',
    // 'karma:single',
    'build'
  ]);
};
