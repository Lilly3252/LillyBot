const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["UTable"],
      description: "This command will create and sending an image to the channel with all the current information of the game. Including rotation, whos turn it is, how many cards each user has, whos in the game, and the top card of the pile.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.viewTable(message);
  };
};