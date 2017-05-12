function Vector2D(cfg) {
	var me = this;

	me.x = 0.0;
	me.y = 0.0;

	if (cfg !== undefined) {
		// Make sure x, y are defined
		if (cfg.x !== undefined) {
			me.x = cfg.x;
		}
		if (cfg.y !== undefined) {
			me.y = cfg.y;
		}
	}

	me.toString = function () {
		return '[' + me.x + ', ' + me.y + ']';
	};
}
