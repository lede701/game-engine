function entity(cfg) {
	var me = this;

	if (cfg !== undefined) {
		me.init(cfg);
	}

	me.init = function(cfg){
		Object.assign(cfg);
	};

	me.update = function (deltaTime) {

	};

	me.draw = function (ctx) {
		// Default entity has nothing to draw
	};

	me.engineDraw = function (ctx) {
		// Need to perform all translation and rotation to entity

		// Call the entity draw method

		// Restore context
	};
}