module.exports = function(grunt) {
    // Do grunt-related things in here
    grunt.loadNpmTasks('grunt-loopback-angular');
    grunt.loadNpmTasks('grunt-docular');

    grunt.initConfig({
        loopback_angular: {
            options: {
                input: './app.js',
                output: './public/js/lb-services.js',
                apiUrl: '/api',
                ngModuleName: 'jdr'
            },
            your_target:{
            }
        },
        'docular': {
            groups: [
                {
                    groupTitle: 'LoopBack',
                    groupId: 'loopback',
                    sections: [
                        {
                            id: 'lbServices',
                            title: 'LoopBack Services',
                            scripts: [ 'public/js/lb-services.js' ]
                        }
                    ]
                }
            ]
        }
        // config of other tasks
    });

    grunt.registerTask('default', [
//        'jshint',
        'loopback_angular'
        , 'docular' // newly added
//        'qunit', 'concat', 'uglify'
    ]);
};