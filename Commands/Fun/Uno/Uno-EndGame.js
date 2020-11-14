const { DiscordUNO } = require("discord-uno");
const Command = require("../../../Structures/Command");
const discordUNO = new DiscordUNO()

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["Uno-EndGame"],
      description: "This command will end the game in whatever the current state is. It will determine the winners based off of how many cards users have left in there hand, then it will return a message with the winners.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.endGame(message);
  };
};