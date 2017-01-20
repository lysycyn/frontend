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
      styles:{
        files: ['sass/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        },
      },
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
    'sass',
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