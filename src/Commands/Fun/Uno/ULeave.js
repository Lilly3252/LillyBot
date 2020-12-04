const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["ULeave"],
      description: "This command remove users from the game and returning their cards to the 'deck'.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.removeUser(message);
  };
};