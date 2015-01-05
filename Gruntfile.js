/*jshint node:true*/
module.exports = function(grunt) {

  require( "load-grunt-tasks" )( grunt );

  grunt.initConfig({
    watch: {
      files: '<%= jshint.files %>',
      tasks: 'default'
    },
    jshint: {
      options: {
        jshintrc: true
      },
      files: ['Gruntfile.js', 'assets/js/**/*.js' ]
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: "assets/main.js",
          baseUrl: "assets/",
          dir: "public"
        }
      }
    },
    mocha: {
      index: [ 'test/index.html' ]
    }
  });

  grunt.registerTask('default', 'jshint');
};
