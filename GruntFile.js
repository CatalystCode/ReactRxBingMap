var pkg = require('./package.json');

module.exports = function (grunt) {
  grunt.initConfig({
        browserify: {
            lib: {
                src: './src/index.js',
                dest: pkg.main,
                options: {
                    debug: true,
                    extensions: ['.js'],
                    transform: [["babelify", { "stage": 0 }]]
                }
            },
            example: {
                src: './examples/BeaconExample.js',
                dest: './dist/BeaconExample.js',
                options: {
                    debug: true,
                    extensions: ['.js'],
                    transform: [["babelify", { "stage": 0 }]]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.registerTask('build', ['browserify:lib']);
};
