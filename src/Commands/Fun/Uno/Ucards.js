const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["UCards"],
      description: "Sends a DM to view your current hand in the game. ",
      category: "🃏Uno",
    });
  }
  async run(message){
   await discordUNO.viewCards(message);
  };
};