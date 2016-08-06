// wrapper function
module.exports = function(grunt){
	// load all our Grunt plugins
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
        	pkg: grunt.file.readJSON('package.json'),
        	// task configuration goes here

// BEGIN HTML
/**/			inline: {
					main: {
						src: 'web/res/html/src/index.html',
						dest: 'web/res/html/grunt/index.inline.html'
					}
				},
// END HTML

// BEGIN CSS
/**/           	autoprefixer: {
            		options: {
            			safe: true
            		},
            		maincss: {
            			src: ['web/res/css/src/main.css'],
            			dest: 'web/res/css/grunt/main.prfx.css'
            		},
					criticalcss: {
            			src: ['web/res/css/src/critical.css', 'web/res/css/src/customize.css'],
            			dest: 'web/res/css/grunt/critical.prfx.css'
            		},
            	},
/**/		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			main: {
				files: {
					'web/res/css/dist/main.min.css': ['web/res/css/grunt/main.prfx.css'],
					'web/res/css/dist/critical.min.css': ['web/res/css/grunt/critical.prfx.css'],
					'web/res/css/dist/bootstrap.min.css': ['bower_components/bootstrap/dist/css/bootstrap.min.css']
				}
			}
		},
// END CSS

// BEGIN JS
/**/			jsvalidate: {
					options: {
						globals: {},
						esprimaOptions: {},
						verbose: false
					},
					before_min: {
						files: {
							src: ['Gruntfile.js', 'web/res/js/src/*.js']
						}
					},
					after_min: {
						files: {
							src: ['Gruntfile.js', 'web/res/js/dist/*.js']
						}
					}
				},
/**/			concat: {
					options: {
						separator: ';'
					},
					main: {
						src: [
							'web/res/js/grunt/main.bower.js',
						],
						dest: 'web/res/js/grunt/main.concat.js'
					}
				},
/**/			uglify: {
					options: {
						mangle: false
					},
					target: {
						files: {
							'web/res/js/dist/main.min.js': ['web/res/js/grunt/main.concat.js'],
							'web/res/js/dist/jquery.min.js': ['bower_components/jQuery/dist/jquery.min.js'],
							'web/res/js/dist/bootstrap.min.js': ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
							'web/res/js/dist/instantclick.min.js': ['bower_components/instantclick/instantclick.js']
						}
					}
				},
// END JS

// BEGIN MEDIA
/**/			imagemin: {
					dynamic: {
						options: {
							optimizationLevel: 7
						},
						files: [{
							expand: true,
							cwd: 'web/res/img/src/',
							src: ['**/*.{png,jpg,gif}'],
							dest: 'web/res/img/dist/'
						}]
					}
				}
// END MEDIA
    	});

	// define the default task that executes when we run 'grunt' from inside the project
	grunt.registerTask('default', [
		'autoprefixer',
		'inline',
		'cssmin',
		'inline',
		'jsvalidate:before_min',
		'concat',
		'uglify',
		'jsvalidate:after_min',
		'newer:imagemin'
	]);
};
