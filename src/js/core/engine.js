//engine.js 
function GEngine(cfg){
	// Create a link to myself
	var ge = this;

	ge.autoRun = false;
	ge.canvas = null;
	ge.canvasId = 'theEngine';
	ge.contextType = '2d';
	ge.ctx = null;
	ge.fps = 30;
	ge.world = {
		size: null,
		canvasSize: null,
		fullWindow: true
	};

	///// Define all ening values that are not settable 
	ge._isRunning = false;
	// Current game scene
	ge._scene = [];
	ge._events = new GameEvents({ _parent: ge });
	ge._input = null;

	// Initialize game-engine core code
	ge.init = function (cfg) {
		// Assign config to me
		if(Object.assign !== undefined){
			Object.assign(ge, cfg);
		}
		// Startup canvas
		ge.canvas = document.getElementById(ge.canvasId);
		if (ge.canvas === null) {
			console.log("Adding canvas to scene");
			// Add new canvas object to body of page
			var canvas = document.createElement("canvas");
			canvas.id = ge.canvasId;
			var body = document.getElementsByTagName("body");
			body[0].appendChild(canvas);
			ge.canvas = canvas;
		}// Endif me.canvas is null

		// Try and get context from canvas
		ge.ctx = ge.canvas.getContext(ge.contextType.toLowerCase());
		if (ge.ctx !== null && ge.ctx !== undefined) {
			ge._isRunning = true;
			// Check if we need to set the canvas size
			if (ge.world.canvasSize === null) {
				ge.world.canvasSize = new Vector2D({ x: ge.canvas.clientWidth, y: ge.canvas.clientHeight });
			} else {
				// Set canvas to size of world
				ge.canvas.width = ge.world.canvasSize.x;
				ge.canvas.height = ge.world.canvasSize.y;
			}
			if (ge.world.fullWindow) {
				// Change canvas to fill the window
				ge.world.canvasSize.x = window.innerWidth;
				ge.world.canvasSize.y = window.innerHeight;
				ge.canvas.width = ge.world.canvasSize.x;
				ge.canvas.height = ge.world.canvasSize.y;
			}
			ge._input = new GEInput({ gengine: ge });
			// TODO: Add splash screen
		}// Enduf ctx is not null

		// Verify the event object isn't undefined
		if (ge._events === undefined) {
			ge._events = new GameEvents({ parent: ge });
		}
		var e = ge.events();
		// Add core game engine events
		e.addEvent('onscene');
		e.addEvent('removeentity');
		e.addEvent('removescene');
		e.addEvent('shutdown');

		// Check if autoRun is true
		if (ge.autoRun) {
			ge.run();
		}// Endif autoRun
		e.handle('ready', { engine: ge });
	};

	ge.events = function () {
		return ge._events;
	};

	// Check if config is an object
	if (cfg !== undefined) {
		// Call auto initilization
		ge.init(cfg);
	}

	// Add entity to the current scene
	ge.add = function (ent) {
		ge.getScene().add(ent);
	};

	// Add a new scene and return the existing one
	ge.addScene = function (scene) {
		var old = ge._scene[ge._scene.length - 1];
		scene.init({ _parent: ge });
		ge._scene.push(scene);
		// Notify system a new scene has been loaded
		var evt = { type: 'onscene', old: old, active: scene };
		ge.events().handle('onscene', evt);
		return old;
	};

	// Draw the game world
	ge.draw = function () {
		if (ge.getScene() !== null) {
			if (ge.clearColor !== undefined) {
				var oldStyle = ge.ctx.fillStyle;
				ge.ctx.fillStyle = ge.clearColor;
				ge.ctx.fillRect(0, 0, ge.world.canvasSize.x, ge.world.canvasSize.y);
				ge.ctx.fillStyle = oldStyle;
			} else {
				ge.ctx.clearRect(0, 0, ge.world.canvasSize.x, ge.world.canvasSize.y);
			}
			ge.getScene().draw(ge.ctx);
		}
	};

	ge.getInput = function () {
		return ge._input;
	};

	ge.getScene = function () {
		if (ge._scene.length === 0) {
			ge.addScene(new Scene());
		}

		return ge._scene[ge._scene.length - 1];
	};

	// Remove top scene from stack
	ge.popScene = function () {
		if (ge._scene.length > 0) {
			var scene = ge._scene.pop();
			ge.events().handle('removescene', { old: scene });
			return scene;
		}
	};
	
	// Remove entity from scene
	ge.rm = function (id) {
		var ent = null;
		if (ge.getScene() !== null) {
			ent = ge.getScene().rm(id);
			if (ent !== null) {
				ge.events().handle('removeentity', { entity: ent });
			}
		}
		return ent;
	};

	ge.runLoop = 0;

	ge.run = function () {
		// Start frame timer
		var t0 = performance.now();
		// Perform the basic update/physics algorithm
		ge.update();
		// Perform drawing entities to the canvas
		ge.draw();
		// End performance timer of frame
		var t1 = performance.now();
		// Check if the engine is still running
		if (ge._isRunning) {
			// Calculate the amount of time to wait
			var waitTime = (1000 / ge.fps) - (t1 - t0);
			if (waitTime > 0) {
				// We have time to burn so set the callback funtion
				setTimeout(ge.run, waitTime);
			} else {
				// We have a problem it is taking longer to render one frame then we expected
				console.error('Error ran out of time in frame');
				ge.run();
			}// Endif wait time is greater than 0
		} else {
			ge.event.handle('shutdown', {});
			console.log('Closing engine down');
		}// Endif engine is runing

		// Used in debugging game engine and stopping it after 500 frames
		ge.runLoop = (ge.runLoop + 1) % 2000;
		if (ge.runLoop > 500) {
			//me._isRunning = false;
		}
	};
	
	// Update scene world
	ge.update = function () {
		// TODO: Calculate delta time
		if (ge.getScene() !== null) {
			ge.getScene().update(1.0);
		}
	};
	
}
// End engine.js