function EntityCircle(cfg) {
	var me = this;
	var ent = new Entity(cfg);

	me.radius = 10;
	me.color = '#000000';
	me.lineColor = null;
	me.lineWidth = null;

	Object.assign(me, ent);

	me.draw = function (ctx) {
		var oldStyle = ctx.fillStyle;
		var oldStroke = null;
		if (this.lineColor !== null) {
			oldStroke = ctx.strokeStyle;
			ctx.strokeStyle = this.lineColor;
		}

		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
		ctx.closePath();

		if (this.color !== null) {
			ctx.fillStyle = this.color;
			ctx.fill();
		}

		if (oldStroke !== null) {
			ctx.stroke();
			ctx.strokeStyle = oldStroke;
		}

		ctx.fillStyle = oldStyle;
	};
}