module.exports = function(grunt){
    "use strict";

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'dist/cyrlatconverter.trans.js': 'src/cyrlatconverter.js',
                    'dist/cyrlatconverter_ignore_list_rs.trans.js': 'src/cyrlatconverter_ignore_list_rs.js',
                    'dist/polyfills.trans.js': 'src/polyfills.js'
                }
            }
        },

        uglify: {
            main: {
                files: {
                    "cyrlatconverter.min.js":["dist/polyfills.trans.js", "dist/cyrlatconverter.trans.js", "dist/cyrlatconverter_ignore_list_rs.trans.js"]
                }
            },
            options: {
                mangle:{toplevel:true},
                sourceMap: true,
                sourceMapName: "cyrlatconverter.js.map",
                sourceMapIncludeSources: true,
                compress:true
            }
        }
    });


    grunt.registerTask("default", ["babel", "uglify"]);

};
