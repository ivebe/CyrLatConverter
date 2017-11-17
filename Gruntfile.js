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

        qunit: {
            all: "test/qunit.html"
        }

    });


    grunt.registerTask("default", ["babel","regenerator","uglify","qunit"]);

};