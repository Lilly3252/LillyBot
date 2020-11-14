const { DiscordUNO } = require("discord-uno");
const Command = require("../../../Structures/Command");
const discordUNO = new DiscordUNO

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Uno-Leave"],
      description: "This command remove users from the game and returning their cards to the 'deck'.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.removeUser(message);
  };
};