const { DiscordUNO } = require("discord-uno");
const Command = require("../../../Structures/Command");
const discordUNO = new DiscordUNO();

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Uno-StartGame"],
      description: "This command will only work if the game has at least two users entered. Otherwise it will not work. On success this command will send each user their cards and a starting message to the game channel.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.startGame(message);
  };
};