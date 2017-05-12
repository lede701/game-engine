function EntityRect(cfg) {
	var me = this;
	var ent = new Entity(cfg);

	me.rect = { x: 0, y: 0, w: 80, h: 80 };
	me.color = '#000000';
	me.lineColor = null;
	me.lineWidth = null;

	Object.assign(me, ent);
	// Calculate the center point of our object
	this.pivot.x = ((this.rect.x + this.rect.w) / 2);
	this.pivot.y = ((this.rect.y + this.rect.h) / 2);

	me.draw = function (ctx) {
		var oldStyle = ctx.fillStyle;
		var oldStroke = null;
		if (this.lineColor !== null) {
			oldStroke = ctx.strokeStyle;
			ctx.strokeStyle = this.lineColor;
		}

		var r = this.rect;
		var p = this.pivot;
		if (this.color !== null) {
			ctx.fillStyle = this.color;
			ctx.fillRect(r.x - p.x, r.y - p.y, r.w, r.h);
		}

		if (oldStroke !== null) {
			var lw = ctx.lineWidth;
			if (this.lineWidth !== null) {
				ctx.lineWidth = this.lineWidth;
			}
			ctx.strokeRect(r.x - p.x, r.y - p.y, r.w, r.h);
			ctx.strokeStyle = oldStroke;
			ctx.lineWidth = lw;
		}

		ctx.fillStyle = oldStyle;
	};
}
