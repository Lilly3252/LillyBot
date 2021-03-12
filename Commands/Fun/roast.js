const Command = require('../../Structures/Command');
const roasts = require('../../Structures/JSONs/roast.json');

module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["roast"],
		description: "",
		category: "💃Fun",
		usage: "<mention>"
	  });
	}
	async run(msg) {
		const member = msg.mentions.members.first() ;  
		return msg.channel.send(`${member.user.username}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
	}
};
