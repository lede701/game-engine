function Vector2D(cfg) {
	var ve = this;

	ve.x = 0.0;
	ve.y = 0.0;

	if (cfg !== undefined) {
		// Make sure x, y are defined
		if (cfg.x !== undefined) {
			ve.x = cfg.x;
		}
		if (cfg.y !== undefined) {
			ve.y = cfg.y;
		}
	}

	ve.toString = function () {
		return '[' + ve.x + ', ' + ve.y + ']';
	};
}
