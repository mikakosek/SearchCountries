module.exports = function(grunt) {

  // Project configuration.
grunt.initConfig({
	sass: {
		options: {
			sourceMap: true
		},
		dist: {
			files: {
				'css/style.css': 'scss/style.scss'
			}
		}
	}, 
	
	imagemin: {
		dynamic: {
			files: [{
				expand: true,
				cwd: 'images/',
				src: ['**/*.{png,jpg,gif}', '!build/*{png,jpg,gif}'],
				dest: 'images/build/'
			}]
		}
	}, 
	
	watch: {
		scripts: {
			files: ['scss/*.scss'],
			tasks: ['sass']
		} 
	},
	
	browserSync: {
		bsFiles: {
			src : [
				'css/*.css',
				'js/*.js',
				'*.html'
			]
		},
		options: {
		   	watchTask: true,
			server: {
				baseDir: "./",
                index: "index.html"
	   		}
		}
	}
  });
  
  // Load the plugins tasks 
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default task(s).
  grunt.registerTask('sassTask', ['sass', 'watch']);
  grunt.registerTask('buildTask', ['sass', 'imagemin']);
  grunt.registerTask['workTask', ['browserSync', 'watch']];
  grunt.registerTask['imageTask', ['imagemin']];
  grunt.registerTask('default', ['sass', 'imagemin', 'browserSync', 'watch']);
};