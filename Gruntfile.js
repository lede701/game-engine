//Grintfile.js
module.exports = function(g) {
	g.initConfig({
		pkg: g.file.readJSON('package.json'),
		pw: g.file.readJSON('.ftppass'),
		bundle: {
			core:{
				src: 'src/js/<%= pkg.name %>.js',
				dest: 'build/js/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},
		jshint:{
			src: ['<%= bundle.core.dest %>', 'Gruntfile.js'],
			options:{
				jshintrc: '.jshintrc'
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src',
						src: ['*.html'],
						dest: 'build/'
					}
				]
			}
		},
		watch:{
			src:{
				files: ['Gruntfile.js', 'src//**/*'],
				tasks: ['copy','bundle', 'jshint']
			}
		}
	});
	g.loadNpmTasks('grunt-bundle');
	g.loadNpmTasks('grunt-contrib-copy');
	g.loadNpmTasks('grunt-contrib-jshint');
	g.loadNpmTasks('grunt-contrib-uglify');
	g.loadNpmTasks('grunt-contrib-watch');
	
	// Register the default task and display a basic menu
	g.registerTask('default', 'Hello demo', function(){
		var pkg = g.file.readJSON('package.json');
		g.log.writeln('Demo JS Game Engine ' + pkg.version + "\n\n");
		g.log.writeln('watch: Watch the source directory for any changes and then run build task');
		g.log.writeln('copy: Copy simple source files to the build directory');
	});
	
};
