function Translate(cfg) {
	var me = this;

	me._position = new Vector2D();
	me._scale = new Vector2D({ x: 1.0, y: 1.0 });
	me._rotation = 0.0;

	me.init = function (cfg) {
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
			setVector(me._position, cfg.position);
			// Make sure at the end it doesn't overwrite the vector
			delete cfg.position;
		}
		if (cfg.scale !== undefined) {
			setVector(me._scale, cfg.scale);
			delete cfg.scale;
		}

		// Assign additional parameter from config
		Object.assign(me, cfg);
	};

	if (cfg !== undefined) {
		me.init(cfg);
	}

	me.position = function (vec) {
		if (vec !== undefined) {
			if (vec.x !== undefined) {
				me._position.x = vec.x;
			}
			if (vec.y !== undefined) {
				me._position.y = vec.y;
			}
		}
		return me._position;
	};

	me.scale = function (vec) {
		if (vec !== undefined) {
			if (vec.x !== undefined) {
				me._scale.x = vec.x;
			}
			if (vec.y !== undefined) {
				me._scale.y = vec.y;
			}
		}
	};

	me.rotation = function (rot) {
		if (rot !== undefined) {
			me._rotation = rot;
		}

		return me._rotation;
	};
}