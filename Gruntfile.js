module.exports = function(grunt) {
  grunt.initConfig({

    gitclone: {
      content: {
          options: {
              repository: 'git@github.com:gregoryjscott/content.git',
              branch: 'remove-resume',
              directory: '_tmp/working'
          }
      },

      design: {
          options: {
              repository: 'git@github.com:gregoryjscott/roomy.git',
              branch: 'master',
              directory: '_tmp/design'
          }
      }
    },

    jekyll: {
      build: {
        options: {
          src : '_tmp/working',
          plugins: '_plugins',
          dest: '_site',
          config: '_config.yml, _tmp/working/_config.yml'
        }
      }
    },

    clean: {
      build: {
        src: ["_tmp/working"],
        dot: true
      }
    },

    copy: {
      design: {
        expand: true,
        cwd: '_tmp/design',
        src: '**',
        dest: '_tmp/working/'
      }
    }

  });

  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', [
    'clean:build',
    'gitclone:content',
    'gitclone:design',
    'copy:design',
    'jekyll:build'
  ]);
};
