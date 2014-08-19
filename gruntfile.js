module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt, { pattern: 'grunt-*' });
    
    grunt.initConfig({
        requirejs: {
            optimizer: {
                options: {
                    baseUrl: '.',
                    mainConfigFile: 'scripts/main.js',
                    exclude: [
                        'less',
                        'jquery'
                    ],
                    name: 'scripts/main',
                    out: 'built.js',
                    optimize: 'uglify2'
                }
            }
        }
    });

    grunt.registerTask('build-html', function() {
        var fs = require('fs'),
            inFile = 'index.html',
            outFile = 'built.html';

        fs.writeFileSync(
            'built.html',
            fs.readFileSync(inFile, { encoding: 'utf-8' })
                .replace(/data-main="[^"]+"/gi, 'data-main="built"'),
            { encoding: 'utf-8' });
    });

    grunt.registerTask('default', ['requirejs:optimizer', 'build-html']);
};