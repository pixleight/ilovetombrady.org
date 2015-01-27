module.exports = function(grunt) {
	// Load all tasks
	require('load-grunt-tasks')(grunt);

	var jsFileList = [];
	
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'assets/js/*.js',
				'!assets/js/scripts.js',
				'!assets/**/*.min.*'
			]
		}, // jshint

		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'assets/css/main.css': [
						'assets/sass/main.scss'
					]
				}
			},
			build: {
				options: {
					style: 'compressed'
				},
				files: {
					'assets/css/main.min.css': [
						'assets/sass/main.scss'
					]
				}
			}
		}, // sass

		concat: {
			js: {
				options: {
					separator: ';',
				},
				src: [jsFileList],
				dest: 'assets/js/scripts.js',
			},
			jquery: {
				options: {
					separator: ';',
				},
				src: 'bower_components/jquery/dist/jquery.min.js',
				dest: 'assets/js/vendor/jquery.min.js'
			},
			sass: {
				src: [
					'bower_components/normalize.css/normalize.css',
				],
				dest: 'assets/sass/_normalize.scss',
			}
    	}, // concat

    	uglify: {
    		dist: {
    			files: {
    				'assets/js/scripts.min.js': [jsFileList]
    			}
    		}
    	}, // uglify

    	autoprefixer: {
    		options: {
    			browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
    		},
    		dev: {
    			options: {
    				map: {
    					prev: 'assets/css/'
    				}
    			},
    			src: 'assets/css/main.css'
    		},
    		build: {
    			src: 'assets/css/main.min.css'
    		}
    	}, // autoprefixer

    	modernizr: {
			build: {
				devFile: 'bower_components/modernizr/modernizr.js',
				outputFile: 'assets/js/vendor/modernizr.min.js',
				files: {
					'src': [
						['assets/js/scripts.min.js'],
						['assets/css/main.min.css']
					]
				},
				extra: {
					shiv: false
				},
				uglify: true,
				parseFiles: true
			}
		}, // modernizr

		watch: {
			sass: {
				files: [
					'assets/sass/*.scss',
					'assets/sass/**/*.scss'
				],
				tasks: ['sass:dev', 'autoprefixer:dev']
			},
			js: {
				files: [
					jsFileList,
					'<%= jshint.all %>'
				],
				tasks: ['jshint', 'concat']
			},
		}, // watch

	}); // initConfig

	// Register tasks
	grunt.registerTask('default', [
		'dev'
	]);
	
	grunt.registerTask('dev', [
		'jshint',
		'sass:dev',
		'autoprefixer:dev',
		'concat',
	]);

	grunt.registerTask('build', [
		'jshint',
		'sass:build',
		'autoprefixer:build',
		'uglify',
		'modernizr'
	]);

};