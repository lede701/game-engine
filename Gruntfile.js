//Grintfile.js
module.exports = (g) => {
	g.initConfig({
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
		g.log.writeln('Hello world!');
	});
	
};
