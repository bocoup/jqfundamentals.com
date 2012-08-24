/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'public/js/**/*.js' ]
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        CodeMirror : true,
        define : true,
        require : true
      }
    },
    uglify: {},
    requirejs: {
      dir : 'build',
      baseUrl : 'public',

      modules : [
        { name : 'js/chapter' }
      ],

      shim : {
        'vendor/codemirror' : {
          deps : [ 'vendor/CodeMirror-2.25/lib/codemirror'],
          exports : 'CodeMirror'
        }
      },

      paths : {
        jquery : 'vendor/jquery',
        widgets : 'js/widgets',
        bootstrap : 'vendor/bootstrap/js/bootstrap.min'
      }
    },
    mocha : {
      index : [ 'test/index.html' ]
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-mocha');

};
