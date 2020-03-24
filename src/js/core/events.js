function GameEvents(cfg) {
	var ev = this;

	ev._events = {};
	ev._nextId = 0;
	ev.MAXID = 2000000;

	ev.init = function (cfg) {
		Object.assign(ev, cfg);
		// Initialize the event system
		ev.addEvent('ready');
		ev.addEvent('click');
	};// End init

	ev.addEvent = function (type) {
		// Check if the event type is not defined
		if (ev._events[type] === undefined) {
			ev._events[type] = [];
		}
	};// End addEvent

	ev.handle = function (type, evt) {
		// Check if the event type has been registered first
		if (ev._events[type] !== undefined) {
			// Process each handler in the list
			for (var i = 0; i < ev._events[type].length; ++i) {
				if (ev._events[type][i].handler(evt) === false) {
					// Stop the bubble process because the event handler said so
					break;
				}
			}
		}
	};// End handle

	ev.nextId = function () {
		// Get next id
		var idx = ev._nextId;
		// Calculate the next ID and make sure it doesn't exceed our limits!
		ev._nextId = (ev._nextId + 1) % ev.MAXID;
		return idx;
	};// End nextId

	ev.off = function (type, handler) {
		var retVal = false;
		if (ev._events[type] !== undefined) {
			for (var i = 0; i < ev._events[type].length; ++i) {
				if (ev._events[type][i].handler === handler) {
					// Found event handler so removing it from array
					ev._events[type].splice(i, 1);
					retVal = true;
					break;
				}
			}
		}

		return retVal;
	};// End off

	ev.on = function (type, handler) {
		// Check if the event type is defined
		if (ev._events[type] === undefined) {
			// Nope it isn't so we will be nice and define it for them
			ev.addEvent(type);
		}
		// Create a new event handler object
		var evtHandler = {
			id: ev.nextId(),
			handler: handler
		};
		// Push event object onto the stack
		ev._events[type].push(evtHandler);
		return evtHandler;
	};// End on

	ev.rmEvent = function (type) {
		var evts = null;
		// Check if the event type is defined
		if (ev._events[type] !== undefined) {
			// Save the event handler array
			evts = ev._events[type];
			// Kaboom to the event type
			delete ev._events[type];
		}

		return evts;
	};// End rmEvent

	if (cfg !== undefined) {
		ev.init(cfg);
	}
}