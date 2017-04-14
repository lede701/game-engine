//Grintfile.js
module.exports = (g) => {
	g.initConfig({
		pkg: g.file.readJSON('package.json'),
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src',
						src: ['**'],
						dest: 'build/'
					}
				]
			}
		},
		watch:{
			src:{
				files: ['src//**/*'],
				tasks: ['copy']
			}
		}
	});
	g.loadNpmTasks('grunt-contrib-copy');
	g.loadNpmTasks('grunt-contrib-watch');
	// Register the default task and display a basic menu
	g.registerTask('default', 'Hello demo', function(){
		var pkg = g.file.readJSON('package.json');
		g.log.writeln('Demo JS Game Engine ' + pkg.version);
	});
	
};
