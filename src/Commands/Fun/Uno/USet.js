const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["USet"],
      description: "It will send a message and react to the message, allowing you to change settings based on reactions.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.updateSettings(message);
  };
};