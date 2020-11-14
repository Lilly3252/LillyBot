const { DiscordUNO } = require("discord-uno");
const Command = require("../../../Structures/Command");
const discordUNO = new DiscordUNO();

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Uno-PlayCard"],
      description: "Play a card in thier hand. On success, it will remove the card from their hand and replace the top card. On fail it will return.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.playCard(message);
  };
};