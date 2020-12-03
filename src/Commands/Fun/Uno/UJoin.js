const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["UJoin"],
      description: "This command is adding users to the game in the current channel. This will automatically start the game if the user count reaches ten.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.addUser(message)
  };
};