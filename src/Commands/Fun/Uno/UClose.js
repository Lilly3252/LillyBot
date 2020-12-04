const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["UClose"],
      description: "This command will close the game without scoring any of the users and will immediately end the game. No score will be output and a new game can be created.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.closeGame(message);
  };
};