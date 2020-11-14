const { DiscordUNO } = require("discord-uno");
const Command = require("../../../Structures/Command");
const discordUNO = new DiscordUNO();

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Uno-ViewSet"],
      description: "This command will return a message showing which customizable settings have been turned on or off.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.viewSettings(message);
  };
};