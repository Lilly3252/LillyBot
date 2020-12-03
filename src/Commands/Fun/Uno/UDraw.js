const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["UDraw"],
      description: " Add a card to your hand.Players can't draw if it isn't their turn and if they have a card they can play, they can't draw.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.draw(message);
  };
};