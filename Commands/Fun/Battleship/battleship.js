const { BattleShip } = require("../../../Structures/Constants");

const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["battleship"],
      description: "This command will handle the creation of the game, DMing users, updating each board, attacking the opponent, win states and more. This is all you need to know to create a new game of battle ship! ",
      category: "🚢Battleship",
      usage: "<MentionMember>"
    });
  }
  async run(message){
   await BattleShip.createGame(message);
  };
};