const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["UViewWin"],
      description: "To view the current winners of the game (if there are any).This command can be called at any time to view the current standings of the game.",
      category: "🃏Uno",
    });
  }
    async run(message){
      await discordUNO.viewWinners(message);
    }
};
