module.exports = function(grunt) {
 
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'cyrlatconverter-v0.5.4.js']
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', 'jshint');
 
};
