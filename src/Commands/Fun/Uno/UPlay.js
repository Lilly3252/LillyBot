const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["UPlay"],
      description: "Play a card in thier hand. On success, it will remove the card from their hand and replace the top card. On fail it will return.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.playCard(message);
  };
};