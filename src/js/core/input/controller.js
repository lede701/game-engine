function GEController(cfg) {
	var gec = this;
	gec.StatusCode = { Down: 1, Up: 0 };

	gec.Init = function (cfg) {
		Object.assign(gec, cfg);
	};

	/**
	 * GetInput returns a range from -1.0 to 1.0 for a given input type.  The rnage can be changed with custom controller object defiinions.
	 * Controller: The controller defines how the input validation will process the input based on a three posision switch concept.
	 * @param {any} type - Type is defined in the Controller object (Vertical, Horizontal, Fire1, Fire2, etc...)
	 */
	gec.GetInput = function (type) {
		// Set default result value to 0.0, can't use negitive numbers since it is valid to be between -1.0 and 1.0
		var retVal = 0.0;
		// Check if there is a controller definition
		if (gec.Controls !== undefined && gec.Controls[type] !== undefined) {
			// Get controller object
			var ctrl = gec.Controls[type];
			// Convert the key to keyCode
			var keyOn = gec.ToKeyCode(ctrl.KEYON);
			var keyOff = gec.ToKeyCode(ctrl.KEYOFF);
			// Set return value as default
			retVal = ctrl.Default;
			// Check if the on key is pressed
			if (ctrl.KEYON !== undefined && gec.GetKeyDown(keyOn)) {
				retVal += ctrl.ON;
			}
			// Check if the oppisite direction is pressed
			if (ctrl.KEYOFF !== undefined && gec.GetKeyDown(keyOff)) {
				retVal += ctrl.OFF;
			}
		} else if (gec.Controls === undefined) {
			console.error("Undefined controls");
		}

		return retVal;
	};

	if (cfg !== undefined) {
		gec.Init(cfg);
	}
}