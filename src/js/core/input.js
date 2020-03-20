function GEInput(cfg) {
	var inp = this;
	inp._keyStatus = [];
	inp.StatusCode = { Down: 1, Up: 0 };

	inp.Init = function (cfg) {
		Object.assign(inp, cfg);
	};

	if (cfg !== undefined) {
		inp.Init(cfg);
		for (var i = 0; i < 255; ++i) {
			inp._keyStatus[i] = inp.StatusCode.Up;
		}
		// Connect input handlers to system
		document.addEventListener('keydown', inp.handleKeyDown);
		document.addEventListener('keyup', inp.handleKeyUp);
	}

	inp.GetKey = function (key) {
		return inp._keyStatus[key];
	};

	inp.GetKeyUp = function (key) {
		if (typeof inp._keyStatus[key] !== 'undefined') {
			return inp._keyStatus[key] === inp.StatusCode.Up;
		}
		console.error("Key is not defined");
		return false;
	};

	inp.GetKeyDown = function (key) {
		if (typeof inp._keyStatus[key] !== 'undefined') {
			return inp_keyStatus[key] === inp.StatusCode.Down;
		}
		console.error("Key is not defined");
		return false;
	};

	inp.handleKeyDown = function (e) {
		inp._keyStatus[e.keyCode] = inp.StatusCode.Down;
		return false;
	};

	inp.handleKeyUp = function (e) {
		inp._keyStatus[e.keyCode] = inp.StatusCode.Up;
		return false;
	};
}