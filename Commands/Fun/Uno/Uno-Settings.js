const { DiscordUNO } = require("discord-uno");
const Command = require("../../../Structures/Command");
const discordUNO = new DiscordUNO();

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Uno-Set"],
      description: "It will send a message and react to the message, allowing you to change settings based on reactions.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.updateSettings(message);
  };
};