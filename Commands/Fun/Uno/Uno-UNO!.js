const { DiscordUNO } = require("discord-uno");
const Command = require("../../../Structures/Command");
const discordUNO = new DiscordUNO();
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Uno-UNO"],
      description: "This command will both protecting yourself from future UNO! callouts, and calling other users out that haven't been protected.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.UNO(message);
  };
};