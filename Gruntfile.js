module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'public/stylesheets/*'
                    ],
                dest: 'public/stylesheets/combined.css'
            },
            js: {
                src: [
                    'public/assets/*.js'
                    ],
                dest: 'public/assets/combined.js'
            }
        },

        cssmin: {
            css: {
                src: 'public/stylesheets/combined.css',
                dest: 'public/stylesheets/combined.min.css'
            }
        },

        uglify: {
            js: {
                files: {
                    'combined.js': [ 'public/assets/combined.js' ]
                }
            }
        },

        watch: {
            files: ['public/stylesheets/*', 'public/assets/*.js'],
            tasks: ['concat', 'cssmin', 'uglify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
}