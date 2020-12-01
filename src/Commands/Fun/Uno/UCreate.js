const Command = require("../../../Structures/Command");
const { discordUNO } = require("../../../Structures/Constants");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["UCreate"],
      description: "create a new UNO game. (Games are based off of channel ID)",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.createGame(message)
  };
};