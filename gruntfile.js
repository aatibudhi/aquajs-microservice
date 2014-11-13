module.exports = function (grunt) {
    var gruntConfig = {
        distdir: './build',
        srcdir: './server',
        pkg: grunt.file.readJSON('package.json'),

        src: {
            js: ['<%= srcdir %>/**/*.js'],
            jswatch: ['<%= srcdir %>/**/*.js'],
            jslint: ['<%= srcdir %>/**/*.js']
            //jslint:['<%= srcdir %>/controllers/*.js', '<%= srcdir %>/models/*.js', '<%= srcdir %>/routes/*.js']
        },

        clean: {
            build: {
                src: ['<%= distdir %>']
            }
        },

        copy: {
            main: {
                files: [{dest: '<%= distdir %>', src: '**', expand: true, cwd: '<%= srcdir %>'}]
            }
        },

        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= distdir %>',
                    src: '**/*.js',
                    dest: '<%= distdir %>'
                }]
            }
        },


        watch: {
            all: {
                files: ['<%= src.jswatch %>', 'server.js'],
                tasks: ['update']
            }
        },

        jshint: {
            files: ['gruntFile.js', '<%= src.jslint %>'],
            options: {
                unused: true, // This option warns when you define and never use your variables
                curly: true, // requires you to always put curly braces around blocks in loops & conditionals
                eqeqeq: true,  // This options prohibits the use of == and != in favor of === and !==.
                immed: true, //prohibits the use of immediate function invocations without wrapping them in parentheses
                latedef: false, // This option prohibits the use of a variable before it was defined.
                newcap: true, //requires you to capitalize names of constructor functions
                noarg: true, //prohibits the use of arguments.caller and arguments.callee
                sub: true, // This option suppresses warnings about using [] notation when it can be expressed in dot notation: person['name'] vs. person.name.
                undef: true, // This option prohibits the use of explicitly undeclared variables.
                boss: true, //This option suppresses warnings about the use of assignments in cases where comparisons are expected.
                indent: 2, // This option sets a specific tab width for your code.
                eqnull: true, // option suppresses warnings about == null comparisons
                node: true
            }
        },

        forever: {
            server1: {
                options: {
                    index: 'server.js', // Name of application main file
                    logDir: 'logs'
                }
            }
        },

        mocha_istanbul: {
            coverage: {
                src: 'server/tests/', // a folder works nicely
                options: {
                    mask: '**/*Test.js',
                    coverage: true,
                    coverageFolder: "server/tests/coverage",
                    print: "detail",
                    reportFormats: ['lcovonly']
                }
            }
        },

        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['server/tests/**/*Test.js']
            }
        }
    };

    // Project configuration.
    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-forever');

    //grunt.registerTask('start', ['forever:server1:start']);
    grunt.registerTask('restart', ['forever:server1:restart']);
    grunt.registerTask('stop', ['forever:server1:stop']);

    grunt.registerTask('start', "start up servers", function () {
        grunt.log.writeln("Starting server...");
        require("./server.js");
    });

    grunt.registerTask('default', ['jshint', 'clean:build', 'copy', 'uglify', 'start', 'watch']);
    //grunt.registerTask('update', ['jshint','clean:build','copy', 'uglify','clean:scripts','restart', 'watch']);
    grunt.registerTask('update', ['jshint', 'clean:build', 'copy', 'uglify']);
    grunt.registerTask('coverage', ['mocha_istanbul']);
    grunt.registerTask('test', ['mochaTest']);
};
