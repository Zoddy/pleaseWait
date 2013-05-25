module.exports = function(grunt) {
  var Config = {
        distDirectory: __dirname + '/dist',
        spinnerDirectory: __dirname + '/spinner',
        tmplDirectory: __dirname + '/tmpl'
      },
      fs = require('fs'),
      spinners = fs.readdirSync(Config.spinnerDirectory).map(function(spinner) {
        var directory = Config.spinnerDirectory + '/' + spinner + '/';

        // TODO refactor that!!!
        return {
          cssDistPath: Config.distDirectory + '/' + spinner + '/' + spinner + '.css',
          info: require(directory + 'info.json'),
          html: function() {
            return fs.readFileSync(directory + spinner + '.html', 'utf8');
          },
          stylusSpinnerPath: Config.spinnerDirectory + '/' + spinner + '/' + spinner + '.styl',
          style: fs.readFileSync(directory + spinner + '.styl', 'utf8')
        };
      }),
      getStylusDirectories = function() {
        var i = 0,
            stylusObject = {};

        for (i; i < spinners.length; i++ ) {
          stylusObject[ spinners[i].cssDistPath ] = spinners[i].stylusSpinnerPath;
        }

        stylusObject['./dist/style.css'] = Config.distDirectory + '/style.styl';

        return stylusObject;
      };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // grunt-contrib-clean
    clean: {
      all: [
        Config.distDirectory + '/**/*',
        '!' + Config.distDirectory + '/',
        '!' + Config.distDirectory + '/index.html'
      ],
      index: [
        Config.distDirectory + '/index.html'
      ]
    },


    // grunt-contrib-concat
    concat: {
      spinner: {
        src: [Config.distDirectory + '/**/spinner.html'],
        dest: Config.distDirectory + '/spinners.html'
      },
      stylus: {
        src: [
          __dirname + '/default.styl',
          Config.spinnerDirectory + '/**/*.styl'
        ],
        dest: Config.distDirectory + '/style.styl'
      }
    },


    // grunt-contrib-copy
    copy: {
      main: {
        files: [
          {
            cwd: __dirname + '/',
            expand: true,
            src: ['vendor/**'],
            dest: Config.distDirectory + '/'
          }
        ]
      }
    },


    // grunt-contrib-htmlmin
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: {
          './dist/index.html': './dist/index.html'
        }
      }
    },


    // grunt-contrib-stylus
    stylus: {
      compile: {
        options: {
          compress: true
        },
        files: getStylusDirectories()
      }
    },


    // grunt-contrib-uglify
    uglify: {
      options: {
        report: 'gzip'
      },
      dist: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          './dist/pw.min.js': ['./pw.js']
        }
      }
    },


    // grunt-contrib-watch
    watch: {
      scripts: {
        files: [
          Config.tmplDirectory + '/*.html',
          Config.spinnerDirectory + '/**/*',
          __dirname + '/default.styl',
          __dirname + '/pw.js'
        ],
        tasks: ['default'],
        options: {
          nospawn: true,
        }
      }
    }
  });

  // basic file handling
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // html
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // js
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // css
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // watcher
  grunt.loadNpmTasks('grunt-contrib-watch');

  // spinner template handling
  grunt.registerTask(
    'renderSpinnerListItems',
    'Generate html for each spinner',
    function() {
      var i = 0;

      for (i; i < spinners.length; i++) {
        spinners[i].css = grunt.file.read(spinners[i].cssDistPath);

        grunt.file.write(
          Config.distDirectory + '/' + spinners[i].info.name + '/spinner.html',
          grunt.template.process(
            grunt.file.read(Config.tmplDirectory + '/spinner.html'),
            { data: spinners[i] }
          )
        );

        grunt.log.writeln(
          'File: ./dist/' + spinners[i].info.name + '/spinner.html created.'
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
                script: grunt.file.read(Config.distDirectory + '/pw.min.js')
              }
            }
          }
        )
      );

      grunt.log.writeln('Generated file: "./dist/index.html');
    }
  );


  // Default task(s).
  grunt.registerTask(
    'default',
    [
      'clean:index',
      'stylus',
      'uglify',
      'concat',
      'renderSpinnerListItems',
      'renderIndex',
      'htmlmin',
      //'clean:all',
      'copy'
    ]
  );
};
