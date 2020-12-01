const { discordUNO } = require("../../../Structures/Constants");
const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["UViewSet"],
      description: "This command will return a message showing which customizable settings have been turned on or off.",
      category: "🃏Uno",
    });
  }
  async run(message){
    await discordUNO.viewSettings(message);
  };
};