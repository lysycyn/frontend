module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    uglify: {
      start: {
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    },
    
    
    sass: {
        dist: {
            files: {
                'css/style.css': 'sass/style.scss'
            }
        }
    },
    
    stylus: {
      compile: {
        options: {
          //paths: ['path/to/import', 'another/to/import'],
          //relativeDest: '../out', //path to be joined and resolved with each file dest to get new one.
                                  //mostly useful for files specified using wildcards
          //urlfunc: 'data-uri', // use data-uri('test.png') in our code to trigger Data URI embedding
          //use: [
          //  function () {
          //    return testPlugin('yep'); // plugin with options
          //  },
          //  require('fluidity') // use stylus plugin at compile time
          //],
          //import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
          //  'foo',       //  that is compiled. These might be findable based on values you gave
          //  'bar/moo'    //  to `paths`, or a plugin you added under `use`
          //]
        },
        files: {
          'css/style.css': ['stylus/*.styl'] // compile and concat into single file
        }
      }
    },

    imagemin: {
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['img/svg/*.svg']
        }]
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false,
        svg: {
          style: 'display:none',
        },
        cleanup: [
          'fill',
        ],
      },
      default : {
        files: {
          'img/sprite.svg': ['img/svg/*.svg']
        },
      },
    },

    watch: {
      livereload: {
        options: { livereload: true },
        files: ['build/**/*'],
      },
      scripts: {
        files: ['js/script.js'],
        tasks: ['js'],
        options: {
          spawn: false
        },
      },
      images: {
        files: [
          'img/svg/*.svg'
        ],
        tasks: ['img'],
        options: {
          spawn: false
        },
      },
      html: {
        files: ['./index.html'],
        // tasks: ['html'],
        options: {
          spawn: false
        },
      },
      // for stylus
      styles:{
        files: ['stylus/*.styl'],
        tasks: ['stylus'],
        options: {
          spawn: false
        },
      },
      /* for sass
      styles:{
        files: ['sass/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        },
      },
      */

    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'img/sprite.svg',
            './index.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./",
          },
          startPath: "index.html",
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }

  });




  grunt.registerTask('default', [
    'stylus',
    //'sass',
    'js',
    'img',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('js', [
    'uglify',
  ]);

  grunt.registerTask('img', [
    'imagemin',
    'svgstore',
  ]);

/*
  grunt.registerTask('sass', [
    'sass'
  ]);
*/

};