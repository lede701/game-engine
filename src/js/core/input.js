function GEInput(cfg) {
	var inp = this;
	inp._mouse = [];
	inp._position = null;
	inp._ctrl = {};


	inp.Init = function (cfg) {
		// Assign config to input object
		Object.assign(inp, cfg);

		// Add mouse events
		document.addEventListener('mousemove', inp.handleMouseMove);
		document.addEventListener('mousedown', inp.handleMouseDown);
		document.addEventListener('mouseup', inp.handleMouseUp);

		// Initialize mouse position
		inp._position = new Vector2D({});
		// Access events object
		var evt = inp.parent.events();
		// Create new input events
		evt.addEvent('mousemove');
		evt.addEvent('mousedown');
		evt.addEvent('mouseup');
		evt.addEvent('keydown');
		evt.addEvent('keyup');
		evt.addEvent('keypress');
		evt.addEvent('fire1');
		evt.addEvent('fire2');

		if (inp._ctrl === undefined) {
			inp._ctrl['keyboard'] = new GEKeyboard({ parent: inp.parent });
		}
	};

	inp.GetInput = function (type) {
		var retVal = 0;
		if (inp._ctrl !== undefined) {
			retVal = inp._ctrl.GetInput(type);
		}
		return retVal;
	};

	inp.handleMouseMove = function (e) {
		inp._position.x = e.clientX;
		inp._position.y = e.clientY;
		inp.parent.events().handle('mousemove', e);
		e.preventDefault();
		return false;
	};

	inp.handleMouseDown = function (e) {
		inp.parent.events().handle('mousedown', e);
		e.preventDefault();
		return false;
	};

	inp.handleMouseUp = function (e) {
		inp.parent.events().handle('mouseup', e);
		e.preventDefault();
		return false;
	};

	// Check if the configuration object in not undefined
	if (cfg !== undefined) {
		// Initialize input object
		inp.Init(cfg);
	}
}