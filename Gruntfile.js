module.exports = function(grunt){
    "use strict";

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: {
                    'dist/cyrlatconverter.trans.js': 'src/cyrlatconverter.js',
                    'dist/cyrlatconverter_ignore_list_rs.trans.js': 'src/cyrlatconverter_ignore_list_rs.js'
                }
            }
        },

        regenerator: {
            options: {
                includeRuntime: true
            },
            dist: {
                files: {
                    "dist/cyrlatconverter.es5.js": "dist/cyrlatconverter.trans.js",
                    "dist/cyrlatconverter_ignore_list_rs.es5.js": "dist/cyrlatconverter_ignore_list_rs.trans.js"
                }
            }
        },


        uglify: {
            main: {
                files: {
                    "cyrlatconverter.min.js":["dist/cyrlatconverter.es5.js", "dist/cyrlatconverter_ignore_list_rs.es5.js"]
                }
            },
            options: {
                mangle:{toplevel:true},
                sourceMap: true,
                sourceMapName: "cyrlatconverter.js.map",
                sourceMapIncludeSources: true,
                compress:true
            }
        },

        connect: {
            server: {
                options: {
                    port: 3232
                }
            }
        },

        qunit: {
            all: {
                options: {
                    urls: [
                        '3.2.1',
                        '3.0.0',
                        '2.2.4',
                        '2.2.0',
                        '2.1.4',
                        '2.1.0',
                        '2.0.3',
                        '2.0.0',
                        '1.12.4',
                        '1.12.0',
                        '1.11.3',
                        '1.11.0',
                        '1.10.2',
                        '1.10.0',
                        '1.9.1',
                        '1.9.0'
                    ].map(function(v) {
                        return 'http://localhost:<%= connect.server.options.port %>/test/qunit.html?v=' + v;
                    })
                }
            }
        }

    });


    grunt.registerTask("default", ["babel","regenerator","uglify","connect","qunit"]);
    grunt.registerTask("unit", ["connect","qunit"]);

};