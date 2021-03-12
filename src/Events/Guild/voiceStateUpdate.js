const Event = require('../../Structures/Event.js');
module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: false
		});
    }
    run(oldState,newState){
      console.log(`${oldState.member.id} on ${oldState.channelID} Named : ${oldState.channel ? oldState.channel.name : null } been moved to ${newState.channelID} Named : ${newState.channel ?newState.channel.name :null }`);
 
}};
