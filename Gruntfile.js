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
      files: ['Gruntfile.js', 'public/js/**/*.js' ]
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: "public/main.js",
          baseUrl: "public/",
          dir: "build"
        }
      }
    },
    mocha: {
      index: [ 'test/index.html' ]
    }
  });

  grunt.registerTask('default', 'jshint');
};
