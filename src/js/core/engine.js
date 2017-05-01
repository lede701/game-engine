//engine.js 
function GEngine(cfg){
	// Create a link to myself
	var me = this;

	me.fps = 30;

	// Check if config is an object
	if (cfg !== undefined) {
		// Call auto initilization
		me.init(cfg);
	}

	// Initialize game-engine core code
	me.init = function(cfg){
		// Start the engine
		
		if(Object.assign !== undefined){
			
			Object.assign(me, cfg);
		}
		me._isRunning = true;
	};
	///// Define all ening values that are not suppose 
	me._isRunning = false;

	me.draw = function () {

	};

	me.run = function () {
		// Start frame timer
		var t0 = performance.now();
		// Perform the basic update/physics algorithm
		me.update();
		// Perform drawing entities to the canvas
		me.draw();
		// End performance timer of frame
		var t1 = performance.now();
		// Check if the engine is still running
		if (me._isRunning) {
			// Calculate the amount of time to wait
			var waitTime = (1000 / me.fps) - (t1 - t0);
			if (waitTime > 0) {
				// We have time to burn so set the callback funtion
				setTimeout(me.run, waitTime);
			} else {
				// We have a problem it is taking longer to render one frame then we expected
				console.error('Error ran out of time in frame');
				me.run();
			}// Endif wait time is greater than 0
		}// Endif engine is runing
	};
	
	me.update = function () {

	};
	
}
// End engine.js