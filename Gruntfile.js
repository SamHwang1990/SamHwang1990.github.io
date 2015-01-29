/**
 * Created by sam on 15-1-29.
 */
module.exports = function(grunt){
    grunt.initConfig({
        compass: {
            dist: {
                options: {
                    sassDir: 'design/Stylesheet/scss',
                    cssDir: ['design/Stylesheet/css'],
                    raw: 'preferred_syntax = :sass\n' // Use `raw` since it's not directly available
                }
            }
        },
        copy: {
            js: {
                files: [
                    { dest: 'js', src: 'navigation.js', expand: true, cwd: 'design/Javascript'}
                ]
            },
            css: {
                files: [
                    { dest: 'css', src: '*.css', expand: true, cwd: 'design/Stylesheet/css'}
                ]
            }
        },
        watch: {
            build: {
                files:[
                    'design/Stylesheet/scss/**',
                    'design/Javascript/**',
                    'design/Image/**'
                ],
                tasks:['compass', 'copy', 'timestamp']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    grunt.registerTask('default', ['compass', 'copy', 'watch']);
};