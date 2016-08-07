// wrapper function
module.exports = function(grunt){
	// load all our Grunt plugins
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
        	pkg: grunt.file.readJSON('package.json'),
        	// task configuration goes here

// BEGIN HTML
		emailBuilder: {
			main: {
				files: {
					'web/res/html/dist/index.html': 'web/res/html/src/index.html'
				}
			}
		},
// END HTML

// BEGIN CSS
/**/           	autoprefixer: {
            		options: {
            			safe: true
            		},
            		maincss: {
            			src: ['web/res/css/src/static.css'],
            			dest: 'web/res/css/grunt/static.prfx.css'
            		},
					criticalcss: {
            			src: ['web/res/css/src/dynamic.css', 'web/res/css/src/customize.css'],
            			dest: 'web/res/css/grunt/dynamic.prfx.css'
            		},
            	},
/**/		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			main: {
				files: {
					'web/res/css/dist/static.min.css': ['web/res/css/grunt/static.prfx.css'],
					'web/res/css/dist/dynamic.min.css': ['web/res/css/grunt/dynamic.prfx.css'],
					'web/res/css/dist/bootstrap.min.css': ['bower_components/bootstrap/dist/css/bootstrap.min.css']
				}
			}
		},
// END CSS

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
		'cssmin',
		'newer:imagemin'
	]);
};
