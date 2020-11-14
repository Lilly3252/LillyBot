const { DiscordUNO } = require("discord-uno");
const Command = require("../../../Structures/Command");
const discordUNO = new DiscordUNO();

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Uno-CreateGame"],
      description: "create a new UNO game. (Games are based off of channel ID)",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.createGame(message)
  };
};