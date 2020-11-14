const { DiscordUNO } = require("discord-uno");
const Command = require("../../../Structures/Command");
const discordUNO = new DiscordUNO();

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Uno-Cards"],
      description: "Sends a DM to view your current hand in the game. ",
      category: "🃏Uno",
    });
  }
  async run(message){
   await discordUNO.viewCards(message);
  };
};