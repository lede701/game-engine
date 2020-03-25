function GEGamePad(cfg) {
	var gp = this;

	gp.Init = function (cfg) {
		Object.assign(gp, cfg);
	};

	if (cfg !== undefined) {
		gp.Init(cfg);
	}
}