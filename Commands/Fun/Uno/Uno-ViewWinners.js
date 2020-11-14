const { DiscordUNO } = require("discord-uno");
const Command = require("../../../Structures/Command");
const discordUNO = new DiscordUNO();

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Uno-ViewWinners"],
      description: "To view the current winners of the game (if there are any).This command can be called at any time to view the current standings of the game.",
      category: "🃏Uno",
    });
  }
    async run(message){
      await discordUNO.viewWinners(message);
    };
};