function Translate(cfg) {
	var tr = this;

	tr._position = new Vector2D();
	tr._scale = new Vector2D({ x: 1.0, y: 1.0 });
	tr._rotation = 0.0;

	tr.init = function (cfg) {
		var setVector = function (vec, val) {
			if (val.x !== undefined) {
				vec.x = val.x;
			}
			if (val.y !== undefined) {
				vec.y = val.y;
			}
			return vec;
		};

		// Handle the vectors so we don't delete our current objects
		if (cfg.position !== undefined) {
			setVector(tr._position, cfg.position);
			// Make sure at the end it doesn't overwrite the vector
			delete cfg.position;
		}
		if (cfg.scale !== undefined) {
			setVector(tr._scale, cfg.scale);
			delete cfg.scale;
		}

		// Assign additional parameter from config
		Object.assign(tr, cfg);
	};

	if (cfg !== undefined) {
		tr.init(cfg);
	}

	tr.position = function (vec) {
		if (vec !== undefined) {
			if (vec.x !== undefined) {
				tr._position.x = vec.x;
			}
			if (vec.y !== undefined) {
				tr._position.y = vec.y;
			}
		}
		return tr._position;
	};

	tr.scale = function (vec) {
		if (vec !== undefined) {
			if (vec.x !== undefined) {
				tr._scale.x = vec.x;
			}
			if (vec.y !== undefined) {
				tr._scale.y = vec.y;
			}
		}
	};

	tr.rotation = function (rot) {
		if (rot !== undefined) {
			tr._rotation = rot;
		}

		return tr._rotation;
	};
}