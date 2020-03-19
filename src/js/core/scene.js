function Scene(cfg) {
	var scn = this;
	
	scn._entityList = [];
	scn._nextId = 1;
	scn._MAXID = 2000000; // Max entity id in scene

	scn.init = function (cfg) {
		Object.assign(scn, cfg);
	};

	scn.add = function (ent) {
		// Make sure we have a valid entity
		if (ent !== undefined && ent !== null) {
			ent.id = scn._nextId;
			scn._nextId = (scn._nextId + 1) % scn._MAXID;
			ent._parent = scn;
			if (scn._entityList.push !== undefined) {
				scn._entityList.push(ent);
			} else {
				// Going to add the entity to our list the old fashion way
				scn._entityList[scn._entityList.length + 1] = ent;
				console.log('Entity added the old fashion way');
			}
		}
	};

	scn.draw = function (ctx) {
		if (scn._entityList.length > 0) {
			for (var i = 0; i < scn._entityList.length; ++i) {
				scn._entityList[i].engineDraw(ctx);
			}
		}
	};

	scn.rm = function (id) {
		var ent = null;
		// Check if the id is valid
		if (id !== undefined && id !== null) {
			// Brute force our way through the list
			for (var i = 0; i < scn._entityList.length; ++i) {
				if (id === scn._entityList[i].id) {
					ent = scn._entityList.splice(i, 1);
					break;
				}
			}
		}

		return ent;
	};

	scn.update = function (deltaTime) {
		if (scn._entityList.length > 0) {
			for (var i = 0; i < scn._entityList.length; ++i) {
				scn._entityList[i].engineUpdate(1.0);
			}
		}
	};

	if (cfg !== undefined) {
		scn.init(cfg);
	}
}