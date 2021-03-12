const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["slowmode"],
      description:
        "Place a slowmode to a channel.If the number is 0, it removes the slowmode.",
      category: "🔔Administrator",
      usage: "<number(seconds)>",
      userPerms : ['ADMINISTRATOR'],
    });
  }

  async run(message, args) {
    if (isNaN(args[0])) return message.channel.send("That is not a number!");
    await message.channel
      .setRateLimitPerUser(args[0])
      .then(() => {
        message.channel.send(
          new MessageEmbed({
            title: `Set the slowmode to ${args[0]} seconds`,
          })
        );
      })
      .catch((err) => console.log(err));
  }
};
