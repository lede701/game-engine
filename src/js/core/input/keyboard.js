function GEKeyboard(cfg) {
	var gek = this;

	gek.Init = function (cfg) {
		var ctrl = new GEController(cfg);
		// Map keyboard to keyCode
		ctrl.KEYS = {
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
		ctrl._keyStatus = [];

		// Initialize the standard keyboard input
		for (var i = 0; i < 255; ++i) {
			ctrl._keyStatus[i] = ctrl.StatusCode.Up;
		}

		// Setup basic keyboard controller map
		ctrl.Controls = {
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

		Object.assign(gek, ctrl);
		// Connect input handlers to system
		window.onkeydown = gek.handleKeyDown;
		window.onkeyup = gek.handleKeyUp;

	};

	/**
	* Handle the key down event so we can set the key state
	* @param {any} e
	*/
	gek.handleKeyDown = function (e) {
		if (gek._keyStatus[e.keyCode] !== undefined) {
			gek._keyStatus[e.keyCode] = gek.StatusCode.Down;
		}
		gek.parent.events().handle('keydown', e);
		return false;
	};

	/**
	 * Handle the key up event and set the key state
	 * @param {any} e
	 */
	gek.handleKeyUp = function (e) {
		if (gek._keyStatus[e.keyCode] !== undefined) {
			gek._keyStatus[e.keyCode] = gek.StatusCode.Up;
		}
		gek.parent.events().handle('keyup', e);
		e.preventDefault();
		return false;
	};

	/**
	 * Check if the key is currently in the up position
	 * @param {any} key
	 */
	gek.GetKeyUp = function (key) {
		// Check if key is defined in the tracking object
		if (key !== undefined && gek._keyStatus[key] !== undefined) {
			return gek._keyStatus[key] === gek.StatusCode.Up;
		}
		// Notify console of the undefined key
		console.error("Key is not defined");
		return false;
	};

	/**
	 * Check if the key is in the down position
	 * @param {any} key
	 */
	gec.GetKeyDown = function (key) {
		if (key !== undefined && gec._keyStatus[key] !== undefined) {
			return gec._keyStatus[key] === gec.StatusCode.Down;
		}
		console.error("Key is not defined");
		return false;
	};


	/**
	* Convert the character to mapped key codes.  Make sure to validate the return value for keys that may not have been mapped.
	* @param {any} char
	* @return int - Undefined keys will return -1 as the key code
	*/
	gek.ToKeyCode = function (char) {
		retVal = -1;
		if (gek.KEYS[char] !== undefined) {
			retVal = gek.KEYS[char];
		}
		return retVal;
	};

	if (cfg !== undefined) {
		gek.Init(cfg);
	}
}