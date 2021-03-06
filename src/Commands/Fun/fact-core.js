const Command = require('../../Structures/Command');
const facts = require('../../Structures/JSONs/fact-core.json');

module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["fact-core"],
		description: "",
		category: "💃Fun",
		usage: ""
	  });
	}
	async run(msg) {
		return msg.channel.send(facts[Math.floor(Math.random() * facts.length)]);
	}
};
