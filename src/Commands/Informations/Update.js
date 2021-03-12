const Command = require("../../Structures/Command");

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        aliases: ["updates"],
        description:
          "Shows the current update.",
        category: "⁉️Informations",
        usage:""
      });
    }
  
    async run(message, args) {}}