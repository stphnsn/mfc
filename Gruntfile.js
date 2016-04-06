module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*']
    });

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        paths: {
            app: 'dist',
            dev: 'dev'
        },

        jshint: {
            gruntfile: 'Gruntfile.js',
            client: ['<%= paths.dev %>/js/app.js', '<%= paths.dev %>/js/modules/**/*.js', '<%= paths.dev %>/js/pages/**/*.js'],
            app: ['index.js', 'modules/*.js'],
            options: {
                jshintrc: true
            }
        },

        clean: {
            options: {
                force: true /* Need force to clean beyond current working dir */
            },
            config: {
                src: ['<%= paths.app %>/package.json', '<%= paths.app %>/Procfile']
            },
            app: {
                src: ['<%= paths.app %>/app.js']
            },
            root: {
                src: ['<%= paths.app %>/assets/*', '!<%= paths.app %>/assets/css', '!<%= paths.app %>/assets/fonts', '!<%= paths.app %>/assets/scss', '!<%= paths.app %>/assets/images', '!<%= paths.app %>/assets/js']
            },
            views: {
                src: ['<%= paths.app %>/views/*']
            },
            modules: {
                src: ['<%= paths.app %>/modules/*']
            },
            js: {
                src: ['<%= paths.app %>/assets/js/*']
            },
            css: {
                src: ['<%= paths.app %>/assets/css/*']
            },
            images: {
                src: ['<%= paths.app %>/assets/images/*']
            },
            fonts: {
                src: ['<%= paths.app %>/assets/fonts/*']
            }
        },

        sass: {
            prod: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    '<%= paths.app %>/assets/css/styles.css': '<%= paths.dev %>/scss/styles.scss'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            scss: {
                files: ['<%= paths.dev %>/scss/*.scss'],
                tasks: ['scss']
            },
            js: {
                files: ['<%= paths.dev %>/js/**/*.js'],
                tasks: ['js']
            },
            images: {
                files: ['<%= paths.dev %>/images/**/*'],
                tasks: ['images']
            }
        },

        uglify: {
            options: {
                message: 'We are now ugly',

                // mangle: Turn on or off mangling
                mangle: true,

                // beautify: beautify your code for debugging/troubleshooting purposes
                beautify: false,

                // compress: compresses the code into one
                compress: {},

                // report: Show file size report
                report: 'gzip'
            },
            js: {
                src: ['<%= paths.dev %>/js/app.js', '<%= paths.dev %>/js/modules/*.js'],
                dest: '<%= paths.app %>/assets/js/app.min.js'
            },
            libs: {
                src: ['<%= paths.dev %>/js/libs.js', '<%= paths.dev %>/js/libs/*.js', '!<%= paths.dev %>/js/libs/jquery-*.js', '!<%= paths.dev %>/js/libs/modernizr.js'],
                dest: '<%= paths.app %>/assets/js/libs.min.js'
            }
        },

        concat: {
            options: {
              separator: ';',
            },
            js: {
                src: ['<%= paths.app %>/assets/js/jquery.js', '<%= paths.app %>/assets/js/libs.min.js', '<%= paths.app %>/assets/js/app.min.js'],
                dest: '<%= paths.app %>/assets/js/scripts.min.js'
            }
        },

        copy: {
            jquery: {
                src: ['<%= paths.dev %>/js/libs/jquery-*.js'],
                dest: '<%= paths.app %>/assets/js/jquery.js'
            },
            jslibs: {
                src: ['<%= paths.dev %>/js/libs/*.js', '!<%= paths.dev %>/js/libs/modernizr.js', '!<%= paths.dev %>/js/libs/jquery-*.js'],
                dest: '<%= paths.app %>/assets/js/libs.min.js'
            },
            images: {
                expand: true,
                cwd: '<%= paths.dev %>/images/',
                src: ['**'],
                dest: '<%= paths.app %>/assets/images/'
            },
            fonts: {
                expand: true,
                cwd: '<%= paths.dev %>/fonts',
                src: ['**'],
                dest: '<%= paths.app %>/assets/fonts'
            },
            root: {
                expand: true,
                cwd: '<%= paths.dev %>/root/',
                src: ['**'],
                dest: '<%= paths.app %>/'
            },
            views: {
                expand: true,
                cwd: '<%= paths.dev %>/views/',
                src: ['**'],
                dest: '<%= paths.app %>/views/'
            },
            modules: {
                expand: true,
                cwd: '<%= paths.dev %>/modules/',
                src: ['**'],
                dest: '<%= paths.app %>/modules/'
            },
            app: {
                src: ['<%= paths.dev %>/index.js'],
                dest: '<%= paths.app %>/index.js'
            }
        },

        modernizr: {
            dist: {
                options : [
                    "setClasses"
                ],
                cache : true,
                dest: '<%= paths.app %>/assets/js/modernizr.custom.js',
                files : {
                    src: [
                        '<%= paths.dev %>/js/modules/*.js', '<%= paths.dev %>/scss/*.scss'
                    ]
                },
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 4 version', '> 1%', 'ff esr', 'ie >= 8', 'ios >= 5', 'android >= 2.3'],
                map: false
            },
            site: {
                src: '<%= paths.app %>/assets/css/styles.css'
            }
        }

    });

    grunt.registerTask('js', ['jshint', 'clean:js', 'copy:jquery', 'copy:jslibs', 'uglify:js', 'uglify:libs', 'modernizr', 'concat:js']);
    grunt.registerTask('scss', ['clean:css', 'sass:prod', 'autoprefixer:site', 'modernizr']);
    grunt.registerTask('images', ['clean:images', 'copy:images']);
    grunt.registerTask('fonts', ['clean:fonts', 'copy:fonts']);

    grunt.registerTask('views', ['clean:views', 'copy:views']);
    grunt.registerTask('modules', ['clean:modules','copy:modules']);
    grunt.registerTask('root', ['clean:root', 'copy:root']);
    grunt.registerTask('app', ['clean:app', 'copy:app']);

    // Targets
    grunt.registerTask('default', ['js', 'scss', 'images', 'fonts', 'views', 'modules', 'app', 'root']);
};