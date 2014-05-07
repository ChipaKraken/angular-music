module.exports = function(grunt) {
  grunt.initConfig({
  coffee: {
    compileBare: {
      options: {
        bare: true
      },
      files: {
        'app.js': 'app.coffee',
        'helper.js': 'helper.coffee'
      }
    }
  },

  uglify: {
    helper: {
      files: {
        'helper.min.js': 'helper.js',
        'app.min.js': 'app.js'
      }
    }
  },

  concat: {
    options: {
      separator: '\n',
    },
    dist: {
      src: ['bower_components/angular/angular.min.js', 'bower_components/angular-ui-router/release/angular-ui-router.min.js', 'bower_components/jquery/dist/jquery.min.js', 'helper.min.js', 'app.min.js'],
      dest: 'brain.js',
    },
  }

  });
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');


  grunt.registerTask('default',['coffee','uglify','concat']);
}