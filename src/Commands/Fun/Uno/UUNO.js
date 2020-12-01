const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["UUNO"],
      description: "This command will both protecting yourself from future UNO! callouts, and calling other users out that haven't been protected.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.UNO(message);
  };
};