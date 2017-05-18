function GameEvents(cfg) {
	var me = this;

	me._events = {};
	me._nextId = 0;
	me.MAXID = 2000000;

	me.init = function (cfg) {
		Object.assign(me, cfg);
		// Initialize the event system
		me.addEvent('ready');
		me.addEvent('click');
		me.addEvent('mousemove');
		me.addEvent('keypress');
		document.onclick = me.handleClick;
		document.onmousemove = me.handleMove;
		document.onkeypress = me.handleKeyPress;
	};// End init

	me.addEvent = function (type) {
		// Check if the event type is not defined
		if (me._events[type] === undefined) {
			me._events[type] = [];
		}
	};// End addEvent

	me.handle = function (type, evt) {
		// Check if the event type has been registered first
		if (me._events[type] !== undefined) {
			// Process each handler in the list
			for (var i = 0; i < me._events[type].length; ++i) {
				if (me._events[type][i].handler(evt) === false) {
					// Stop the bubble process because the event handler said so
					break;
				}
			}
		}
	};// End handle

	me.handleClick = function (evt) {
		me.handle('click', evt);
	};// End handleClick

	me.handleKeyPress = function (e) {
		me.handle('keypress', e);
		return false;
	};

	me.handleMove = function (evt) {
		me.handle('mousemove', evt);
	};// End handleMove

	me.nextId = function () {
		// Get next id
		var idx = me._nextId;
		// Calculate the next ID and make sure it doesn't exceed our limits!
		me._nextId = (me._nextId + 1) % me.MAXID;
		return idx;
	};// End nextId

	me.off = function (type, handler) {
		var retVal = false;
		if (me._events[type] !== undefined) {
			for (var i = 0; i < me._events[type].length; ++i) {
				if (me._events[type][i].handler === handler) {
					// Found event handler so removing it from array
					me._events[type].splice(i, 1);
					retVal = true;
					break;
				}
			}
		}

		return retVal;
	};// End off

	me.on = function (type, handler) {
		// Check if the event type is defined
		if (me._events[type] === undefined) {
			// Nope it isn't so we will be nice and define it for them
			me.addEvent(type);
		}
		// Create a new event handler object
		var evtHandler = {
			id: me.nextId(),
			handler: handler
		};
		// Push event object onto the stack
		me._events[type].push(evtHandler);
		return evtHandler;
	};// End on

	me.rmEvent = function (type) {
		var evts = null;
		// Check if the event type is defined
		if (me._events[type] !== undefined) {
			// Save the event handler array
			evts = me._events[type];
			// Kaboom to the event type
			delete me._events[type];
		}

		return evts;
	};// End rmEvent

	if (cfg !== undefined) {
		me.init(cfg);
	}
}