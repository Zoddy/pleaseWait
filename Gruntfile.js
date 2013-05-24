'use strict';

module.exports = function(grunt) {
  var Config = {
        distDirectory: __dirname + '/dist',
        spinnerDirectory: __dirname + '/spinner',
        tmplDirectory: __dirname + '/tmpl'
      },
      fs = require('fs'),
      spinners = fs.readdirSync(Config.spinnerDirectory).map(function(spinner) {
        var directory = Config.spinnerDirectory + '/' + spinner + '/';

        return {
          info: require(directory + 'info.json'),
          html: fs.readFileSync(directory + spinner + '.html', 'utf8'),
          style: fs.readFileSync(directory + spinner + '.styl', 'utf8')
        };
      });

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // grunt-contrib-concat
    concat: {
      spinner: {
        src: [Config.distDirectory + '/**/spinner.html'],
        dest: './dist/spinners.html'
      }
    },

    stylus: {
      compile: {
        files: {
          './dist/style.css': [Config.spinnerDirectory + '/**/*.styl']
        }
      }
    }
  });

  // basic file handling
  grunt.loadNpmTasks('grunt-contrib-concat');

  // css
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // spinner template handling
  grunt.registerTask(
    'renderSpinnerListItems',
    'Generate html for each spinner',
    function() {
      var i = 0;

      for (i; i < spinners.length; i++) {
        grunt.file.write(
          Config.distDirectory + '/' + spinners[i].info.name + '/spinner.html',
          grunt.template.process(
            grunt.file.read(Config.tmplDirectory + '/spinner.html'),
            { data: spinners[i] }
          )
        );

        grunt.log.writeln(
          'Generated file: "./dist/' + spinners[i].info.name + '/spinner.html"'
        );
      }
    }
  );

  // index template handling
  grunt.registerTask(
    'renderIndex',
    'Generate index.html',
    function() {
      grunt.file.write(
        Config.distDirectory + '/index.html',
        grunt.template.process(
          grunt.file.read(Config.tmplDirectory + '/index.html'),
          {
            data: {
              spinners: {
                html: grunt.file.read(Config.distDirectory + '/spinners.html'),
                style: grunt.file.read(Config.distDirectory + '/style.css'),
                script: grunt.file.read(__dirname + '/pw.js')
              }
            }
          }
        )
      );

      grunt.log.writeln('Generated file: "./dist/index.html');
      //grunt.log.writeln('Included file: "./dist/index.html');
    }
  );




  // Default task(s).
  grunt.registerTask(
    'default',
    ['renderSpinnerListItems', 'concat', 'stylus', 'renderIndex']
  );
};
