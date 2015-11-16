var pkg = require('./package.json');

module.exports = function (grunt) {
  grunt.initConfig({
        browserify: {
            example: {
                src: './examples/bingMapsExample.js',
                dest: './dist/bingMapsExample.js',
                options: {
                    debug: true,
                    extensions: ['.js'],
                    transform: [["babelify", { "stage": 0 }]]
                }
            }
        },
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.registerTask('build', ['browserify:example']);
};
