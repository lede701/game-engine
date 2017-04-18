//engine.js 
function GEngine(cfg){
	// Create a link to myself
	var me = this;
	// Initialize game-engine core code
	me.init = function(cfg){
		// Start the engine
		
		if(Object.assign !== undefined){
			
			Object.assign(me, cfg);
		}
	};
	
	// Check if config is an object
	if(cfg !== undefined){
		// Call auto initilization
		me.init(cfg);
	}
	
}
// End engine.js