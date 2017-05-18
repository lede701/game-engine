function Scene(cfg) {
	var me = this;
	
	me._entityList = [];
	me._nextId = 1;
	me._MAXID = 2000000; // Max entity id in scene

	me.init = function (cfg) {
		Object.assign(me, cfg);
	};

	me.add = function (ent) {
		// Make sure we have a valid entity
		if (ent !== undefined && ent !== null) {
			ent.id = me._nextId;
			me._nextId = (me._nextId + 1) % me._MAXID;
			ent._parent = me;
			if (me._entityList.push !== undefined) {
				me._entityList.push(ent);
			} else {
				// Going to add the entity to our list the old fashion way
				me._entityList[me._entityList.length + 1] = ent;
				console.log('Entity added the old fashion way');
			}
		}
	};

	me.draw = function (ctx) {
		if (me._entityList.length > 0) {
			for (var i = 0; i < me._entityList.length; ++i) {
				me._entityList[i].engineDraw(ctx);
			}
		}
	};

	me.rm = function (id) {
		var ent = null;
		// Check if the id is valid
		if (id !== undefined && id !== null) {
			// Brute force our way through the list
			for (var i = 0; i < me._entityList.length; ++i) {
				if (id === me._entityList[i].id) {
					ent = me._entityList.splice(i, 1);
					break;
				}
			}
		}

		return ent;
	};

	me.update = function (deltaTime) {
		if (me._entityList.length > 0) {
			for (var i = 0; i < me._entityList.length; ++i) {
				me._entityList[i].engineUpdate(1.0);
			}
		}
	};

	if (cfg !== undefined) {
		me.init(cfg);
	}
}