function GEInput(cfg) {
	var inp = this;
	inp._keyStatus = [];
	inp._mouse = [];
	inp._position = null;
	inp.StatusCode = { Down: 1, Up: 0 };

	// Map keyboard to keyCode
	inp.KEYS = {
		BACKSPACE: 8,
		TAB: 9,
		ENTER: 13,
		SHIFT: 16,
		CTRL: 17,
		ALT: 18,
		CAPSLOCK: 20,
		ESC: 27,
		SPACE: 32,
		0: 48,
		1: 49,
		2: 50,
		3: 51,
		4: 52,
		5: 53,
		6: 54,
		7: 55,
		8: 56,
		9: 57,
		A: 65,
		B: 66,
		C: 67,
		D: 68,
		E: 69,
		F: 70,
		G: 71,
		H: 72,
		I: 73,
		J: 74,
		K: 75,
		L: 76,
		M: 77,
		N: 78,
		O: 79,
		P: 80,
		Q: 81,
		R: 82,
		S: 83,
		T: 84,
		U: 85,
		V: 86,
		W: 87,
		X: 88,
		Y: 89,
		Z: 90,
		F1: 112,
		F2: 113,
		F3: 114,
		F5: 115,
		F6: 116,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123
	};

	// Setup basic keyboard controller map
	inp.Controls = {
		Vertical: {
			Default: 0,
			ON: -1.0,
			OFF: 1.0,
			KEYON: 'W',
			KEYOFF: 'S'
		},
		Horizontal: {
			Default: 0,
			ON: -1.0,
			OFF: 1.0,
			KEYON: 'A',
			KEYOFF: 'D'

		},
		Fire1: {
			Default: 0,
			ON: 1.0,
			OFF: 0.0,
			KEYON: 'SPACE',
			KEYOFF: undefined
		},
		Fire2: {
			Default: 0,
			ON: 1.0,
			OFF: 0.0,
			KEYON: 'ENTER',
			KEYOFF: undefined
		}
	};

	inp.Init = function (cfg) {
		// Assign config to input object
		Object.assign(inp, cfg);
		// Initialize the standard keyboard input
		for (var i = 0; i < 255; ++i) {
			inp._keyStatus[i] = inp.StatusCode.Up;
		}
		// Connect input handlers to system
		window.onkeydown = this.handleKeyDown;
		window.onkeyup = this.handleKeyUp;

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
	};

	inp.GetKey = function (key) {
		// Return the raw status of key
		return inp._keyStatus[key];
	};

	/**
	 * GetInput returns a range from -1.0 to 1.0 for a given input type.  The rnage can be changed with custom controller object defiinions.
	 * Controller: The controller defines how the input validation will process the input based on a three posision switch concept.
	 * @param {any} type - Type is defined in the Controller object (Vertical, Horizontal, Fire1, Fire2, etc...)
	 */
	inp.GetInput = function (type) {
		// Set default result value to 0.0, can't use negitive numbers since it is valid to be between -1.0 and 1.0
		var retVal = 0.0;
		// Check if there is a controller definition
		if (inp.Controls[type] !== undefined) {
			// Get controller object
			var ctrl = inp.Controls[type];
			// Convert the key to keyCode
			var keyOn = inp.ToKeyCode(ctrl.KEYON);
			var keyOff = inp.ToKeyCode(ctrl.KEYOFF);
			// Set return value as default
			retVal = ctrl.Default;
			// Check if the on key is pressed
			if (ctrl.KEYON !== undefined && inp.GetKeyDown(keyOn)) {
				retVal += ctrl.ON;
			}
			// Check if the oppisite direction is pressed
			if (ctrl.KEYOFF !== undefined && inp.GetKeyDown(keyOff)) {
				retVal += ctrl.OFF;
			}
		}

		return retVal;
	};

	/**
	 * Check if the key is currently in the up position
	 * @param {any} key
	 */
	inp.GetKeyUp = function (key) {
		// Check if key is defined in the tracking object
		if (key !== undefined && inp._keyStatus[key] !== undefined) {
			return inp._keyStatus[key] === inp.StatusCode.Up;
		}
		// Notify console of the undefined key
		console.error("Key is not defined");
		return false;
	};

	/**
	 * Check if the key is in the down position
	 * @param {any} key
	 */
	inp.GetKeyDown = function (key) {
		if (key !== undefined && inp._keyStatus[key] !== undefined) {
			return inp._keyStatus[key] === inp.StatusCode.Down;
		}
		console.error("Key is not defined");
		return false;
	};

	/**
	 * Handle the key down event so we can set the key state
	 * @param {any} e
	 */
	inp.handleKeyDown = function (e) {
		if (inp._keyStatus[e.keyCode] !== undefined) {
			inp._keyStatus[e.keyCode] = inp.StatusCode.Down;
		}
		inp.parent.events().handle('keydown', e);
		return false;
	};

	/**
	 * Handle the key up event and set the key state
	 * @param {any} e
	 */
	inp.handleKeyUp = function (e) {
		if (inp._keyStatus[e.keyCode] !== undefined) {
			inp._keyStatus[e.keyCode] = inp.StatusCode.Up;
		}
		inp.parent.events().handle('keyup', e);
		e.preventDefault();
		return false;
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

	/**
	 * Convert the character to mapped key codes.  Make sure to validate the return value for keys that may not have been mapped.
	 * @param {any} char
	 * @return int - Undefined keys will return -1 as the key code
	 */
	inp.ToKeyCode = function (char) {
		retVal = -1;
		if (inp.KEYS[char] !== undefined) {
			retVal = inp.KEYS[char];
		}
		return retVal;
	};

	// Check if the configuration object in not undefined
	if (cfg !== undefined) {
		// Initialize input object
		inp.Init(cfg);
	}
}