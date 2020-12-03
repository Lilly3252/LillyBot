const Event = require('../../Structures/Event.js');
const mongoose = require('mongoose');
const Guild = require('../../Database/models/Guild');
const config = require("../../config.json");

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: false
		});
    }
    run(guild){
        const joinedguild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: guild.id,
            guildName: guild.name,
            prefix: config.prefix,
            antiRaidMode: false,
            messageDeleteMode:false,
            messageUpdateMode:false,
        });
    
        joinedguild.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));
        console.log('I have joined a new server! Saved to DB.');
    };
    }
