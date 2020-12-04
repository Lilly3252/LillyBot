

  const Event = require('../../Structures/Event.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: false
		});
    }
    run(oldState,newState){
       
        //console.log(`${oldState.member}On the channel ${oldState.channelID} has been moved to ${newState.channelID}`);
    };
}