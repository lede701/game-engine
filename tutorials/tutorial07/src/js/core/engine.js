//engine.js 
function GEngine(cfg){
	// Create a link to myself
	var me = this;

	me.autoRun = false;
	me.canvas = null;
	me.canvasId = 'theEngine';
	me.contextType = '2d';
	me.ctx = null;
	me.fps = 30;
	me.world = {
		size: null,
		canvasSize: null,
		fullWindow: true
	};

	///// Define all ening values that are not settable 
	me._isRunning = false;
	// Current game scene
	me._scene = [];
	me._events = new GameEvents({ _parent: me });

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
			}
			// TODO: Add splash screen
		}// Enduf ctx is not null

		// Verify the event object isn't undefined
		if (me._events === undefined) {
			me._events = new GameEvents({ parent: me });
		}

		// Check if autoRun is true
		if (me.autoRun) {
			me.run();
		}// Endif autoRun
		me.events().handle('ready', { engine: me });
	};

	me.events = function () {
		return me._events;
	};

	// Check if config is an object
	if (cfg !== undefined) {
		// Call auto initilization
		me.init(cfg);
	}

	// Add entity to the current scene
	me.add = function (ent) {
		me.getScene().add(ent);
	};

	// Add a new scene and return the existing one
	me.addScene = function (scene) {
		var old = me._scene[me._scene.length - 1];
		scene.init({ _parent: me });
		me._scene.push(scene);
		return old;
	};

	// Draw the game world
	me.draw = function () {
		if (me.getScene() !== null) {
			if (me.clearColor !== undefined) {
				var oldStyle = me.ctx.fillStyle;
				me.ctx.fillStyle = me.clearColor;
				me.ctx.fillRect(0, 0, me.world.canvasSize.x, me.world.canvasSize.y);
				me.ctx.fillStyle = oldStyle;
			} else {
				me.ctx.clearRect(0, 0, me.world.canvasSize.x, me.world.canvasSize.y);
			}
			me.getScene().draw(me.ctx);
		}
	};

	me.getScene = function () {
		if (me._scene.length === 0) {
			me.addScene(new Scene());
		}

		return me._scene[me._scene.length - 1];
	};

	// Remove top scene from stack
	me.popScene = function () {
		if (me._scene.length > 0) {
			return me._scene.pop();
		}
	};
	
	// Remove entity from scene
	me.rm = function (id) {
		var ent = null;
		if (me.getScene() !== null) {
			ent = me.getScene().rm(id);
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
		if (me.runLoop++ > 500) {
			//me._isRunning = false;
		}
	};
	
	// Update scene world
	me.update = function () {
		if (me.getScene() !== null) {
			me.getScene().update(1.0);
		}
	};
	
}
// End engine.js