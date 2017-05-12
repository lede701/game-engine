function Entity(cfg) {
	var me = this;

	// Items that can be provided by the config object
	////////////////////////////////////////////////////
	me._translate = new Translate({
		position: { x: 0, y: 0 },
		rotation: 0,
		scale: { x: 1.0, y: 1.0 }
	});
	me._speed = new Vector2D();
	me.drawPivotPt = false;
	me.pivot = new Vector2D({ x: 0, y: 0 });
	me.pivotColor = '#00ff00';// Added pivot color for completeness so users can change color if needed.

	me.init = function (cfg) {
		if (cfg.translate !== undefined) {
			this._translate.init(cfg.translate);
			delete cfg.translate;
		}

		Object.assign(me, cfg);
	};

	me.draw = function (ctx) {
		// Default entity has nothing to draw
	};

	me.update = function (deltaTime) {
		// Update method to be overloaded
		// Do some basic speed calculations
		var pos = this._translate.position();
		pos.x += this._speed.x * deltaTime;
		pos.y += this._speed.y * deltaTime;
	};

	if (cfg !== undefined) {
		me.init(cfg);
	}

	// Code that should be provided as part of the config
	///////////////////////////////////////////////////////
	me._children = [];
	me._nextId = 0;
	me.id = -1;
	me._180PI = Math.PI / 180; // Constant so I don't have to calulate this every frame


	me.add = function (child) {
		if (this._children.push !== undefined) {
			var idx = me.idx + ":" + me._nextId++;
			child.id = idx;
			this._children.push(child);
			child._parent = this;
		}
	};

	me.compare = function (ent) {
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



	me.engineDraw = function (ctx) {
		// Save contex state
		ctx.save();
		var pos = new Vector2D({ x:this.translate().position().x, y: this.translate().position().y });

		var rot = this.translate().rotation() * me._180PI;
		ctx.translate(pos.x, pos.y);
		if (rot !== 0) {
			ctx.rotate(rot);
		}

		var oldAlpha = ctx.globalAlpha;
		ctx.globalAlpha = me.alpha;

		this.draw(ctx);
		if (me._children.length > 0) {
			for (var i = 0; i < me._children.length; ++i) {
				me._children[i].engineDraw(ctx);
			}
		}

		if (rot !== 0) {
			ctx.rotate(-rot);
		}
		// Check to see if we want to add a dot for the pivot point
		if (this.drawPivotPt) {
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = me.pivotColor;
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
	me.engineUpdate = function (deltaTime) {
		this.update(deltaTime);
		if (this._children.length > 0) {
			for (var i = 0; i < this._children.length; ++i) {
				this._children[i].engineUpdate(deltaTime);
			}
		}
	};

	// Remove child form children list
	me.rm = function (id) {
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

	me.speed = function (spd) {
		if (spd !== undefined) {
			if (spd.x !== undefined) {
				me._speed.x = spd.x;
			}
			if (spd.y !== undefined) {
				me._speed.y = spd.y;
			}
		}

		return me._speed;
	};
	
	me.translate = function () {
		return me._translate;
	};
}