//engine.js 
function GEngine(cfg){
	// Create a link to myself
	var me = this;

	me.canvas = null;
	me.canvasId = 'theEngine';
	me.contextType = '2d';
	me.ctx = null;
	me.autoRun = false;
	me.fps = 30;
	me.world = {
		size: null,
		canvasSize: null,
		fullWindow: true
	};

	///// Define all ening values that are not settable 
	me._isRunning = false;
	me._entityList = [];
	me._entNextId = 0;

	// Initialize game-engine core code
	me.init = function (cfg) {
		// Assign config to me
		if(Object.assign !== undefined){
			Object.assign(me, cfg);
		}
		// Startup canvas
		me.canvas = document.getElementById(me.canvasId);
		if (me.canvas === null) {
			// TODO: Auto add canvas to the body of site
			console.log(me.canvas);
		}// Endif me.canvas is null

		// Try and get context from canvas
		me.ctx = me.canvas.getContext(me.contextType.toLowerCase());
		if (me.ctx !== null && me.ctx !== undefined) {
			me._isRunning = true;
			// Check if we need to set the canvas size
			if (me.world.canvasSize === null) {
				me.world.canvasSize = new Vector2D({ x: me.canvas.clientWidth, y: me.canvas.clientHeight });
			} else {
				// Set canvas to size of world
				me.canvas.width = me.world.canvasSize.x;
				me.canvas.height = me.world.canvasSize.y;
			}
			if (me.world.fullWindow) {
				// Change canvas to fill the window
				me.world.canvasSize.x = window.innerWidth;
				me.world.canvasSize.y = window.innerHeight;
				me.canvas.width = me.world.canvasSize.x;
				me.canvas.height = me.world.canvasSize.y;
				console.log(me.world);
			}
			// TODO: Add splash screen
		}// Enduf ctx is not null

		// Check if autoRun is true
		if (me.autoRun) {
			me.run();
		}// Endif autoRun
	};

	// Check if config is an object
	if (cfg !== undefined) {
		// Call auto initilization
		me.init(cfg);
	}

	me.add = function (ent) {
		// Make sure we have a valid entity
		if (ent !== undefined && ent !== null) {
			ent.id = me._entNextId;
			me._entNextId = (me._entNextId + 1) % 2000000;
			ent.parent = me;
			if (me._entityList.push !== undefined) {
				me._entityList.push(ent);
			} else {
				// Going to add the entity to our list the old fashion way
				me._entityList[me._entityList.length + 1] = ent;
				console.log('Entity added the old fashion way');
			}
		}
	};

	me.draw = function () {
		if (me._entityList.length > 0) {
			me.ctx.clearRect(0, 0, me.world.canvasSize.x, me.world.canvasSize.y);
			for (var i = 0; i < me._entityList.length; ++i) {
				me._entityList[i].engineDraw(me.ctx);
			}
		}
	};
	
	me.rm = function (id) {
		var ent = null;
		// Check if the id is valid
		if (id !== undefined && id !== null) {
			// Brute force our way through the list
			for (var i = 0; i < me._entityList.length; ++i) {
				if (me._entityList[i].id === i) {
					ent = me._entityList.splice(i, 1);
				}
			}
		}

		return ent;
	};

	me.runLoop = 0;

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
		} else {
			console.log('Closing engine down');
		}// Endif engine is runing
		if (me.runLoop++ > 50) {
			//me._isRunning = false;
		}
	};
	
	me.update = function () {
		if (me._entityList.length > 0) {
			for (var i = 0; i < me._entityList.length; ++i) {
				me._entityList[i].engineUpdate(1.0);
			}
		}
	};
	
}
// End engine.js