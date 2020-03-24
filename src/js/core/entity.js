function Entity(cfg) {
	var ent = this;

	// Items that can be provided by the config object
	////////////////////////////////////////////////////
	ent._parent = null;
	ent._translate = new Translate({
		position: { x: 0, y: 0 },
		rotation: 0,
		scale: { x: 1.0, y: 1.0 }
	});
	ent._speed = new Vector2D();
	ent.drawPivotPt = false;
	ent.pivot = new Vector2D({ x: 0, y: 0 });
	ent.pivotColor = '#00ff00';// Added pivot color for completeness so users can change color if needed.

	ent.init = function (cfg) {
		if (cfg.translate !== undefined) {
			this._translate.init(cfg.translate);
			delete cfg.translate;
		}

		Object.assign(ent, cfg);
	};

	ent.draw = function (ctx) {
		// Default entity has nothing to draw
	};

	ent.gengine = function () {
		var p = this._parent;
		var eng = null;
		if (p !== null) {
			while (p !== undefined) {
				eng = p;
				p = p._parent;
			}
		}

		return eng;
	};

	ent.update = function (deltaTime) {
		// Update method to be overloaded
		// Do some basic speed calculations
		var pos = ent._translate.position();
		pos.x += ent._speed.x * deltaTime;
		pos.y += ent._speed.y * deltaTime;
	};

	if (cfg !== undefined) {
		ent.init(cfg);
	}

	// Code that should be provided as part of the config
	///////////////////////////////////////////////////////
	ent._children = [];
	ent._nextId = 0;
	ent.id = -1;
	ent._180PI = Math.PI / 180; // Constant so I don't have to calulate this every frame


	ent.add = function (child) {
		if (this._children.push !== undefined) {
			var idx = ent.idx + ":" + ent._nextId++;
			child.id = idx;
			this._children.push(child);
			child._parent = this;
		}
	};

	ent.compare = function (ent) {
		var ret = 0;
		var eIds = this.id.split(':');
		var mIds = this.id.split(':');
		if (eIds[eItds.length - 1] > mItds[mIds.length - 1]) {
			ret = 1;
		} else if (eIds[eItds.length - 1] < mItds[mIds.length - 1]) {
			ret = -1;
		}

		return ret;
	};



	ent.engineDraw = function (ctx) {
		// Save contex state
		ctx.save();
		var pos = new Vector2D({ x:this.translate().position().x, y: this.translate().position().y });

		var rot = this.translate().rotation() * ent._180PI;
		ctx.translate(pos.x, pos.y);
		if (rot !== 0) {
			ctx.rotate(rot);
		}

		var oldAlpha = ctx.globalAlpha;
		ctx.globalAlpha = this.alpha;

		this.draw(ctx);
		if (this._children.length > 0) {
			for (var i = 0; i < ent._children.length; ++i) {
				this._children[i].engineDraw(ctx);
			}
		}

		if (rot !== 0) {
			ctx.rotate(-rot);
		}
		// Check to see if we want to add a dot for the pivot point
		if (this.drawPivotPt) {
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = this.pivotColor;
			ctx.beginPath();
			ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = oldStyle;
		}

		ctx.translate(-pos.x, -pos.y);
		ctx.globalAlpha = oldAlpha;
		// Restore context state
		ctx.restore();
	};

	// Do not overwrite this module it will break the parent child relationship!
	ent.engineUpdate = function (deltaTime) {
		this.update(deltaTime);
		if (this._children.length > 0) {
			for (var i = 0; i < this._children.length; ++i) {
				this._children[i].engineUpdate(deltaTime);
			}
		}
	};

	// Remove child form children list
	ent.rm = function (id) {
		ent = null;
		if (id !== undefined) {
			for (var i = 0; i < this._children.length; ++i) {
				if (this._children[i].id === id) {
					// Remove item from the array
					ent = this._children.slice(i, 1);
					// Unparent entity
					ent.parent = null;
					// Stop searching we have found the entity
					break;
				}
			}
		}

		return ent;
	};

	ent.speed = function (spd) {
		if (spd !== undefined) {
			if (spd.x !== undefined) {
				ent._speed.x = spd.x;
			}
			if (spd.y !== undefined) {
				ent._speed.y = spd.y;
			}
		}

		return ent._speed;
	};
	
	ent.translate = function () {
		return ent._translate;
	};

	ent.ToRadians = function (angle) {
		if (Math.PI180 === undefined) {
			console.log("Calculating PI180");
			Math.PI180 = Math.PI / 180;
		}
		return Math.PI180 * angle;
	};
}