module.exports = function(grunt) {
  grunt.initConfig({
  	uglify: {
    helper: {
      files: {
        'helper.min.js': 'helper.js'
      }
    }
  },

  concat: {
    options: {
      separator: '\n',
    },
    dist: {
      src: ['bower_components/angular/angular.min.js', 'bower_components/jquery/dist/jquery.min.js', 'helper.min.js', 'app.js'],
      dest: 'app.min.js',
    },
  }

  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default',['uglify','concat']);
}