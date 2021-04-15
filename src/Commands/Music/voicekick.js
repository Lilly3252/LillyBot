const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["voicekick"],
      category: "🎧Music",
      description: "kicking a member or the bot from the voice channel.",
      usage: "@mention",
      userPerms: ["ADMINISTRATOR"],
      botPerms: ["MOVE_MEMBERS"],
    });
  }

  async run(message, args) {
    const { channel } = message.member.voice;
    const member = message.mentions.members.first();
    if (!member)
      return message.reply(
        "Well ... Okay? but who??"
      );
    if (!channel)
      return message.reply("That user/bot isn't in a voice channel.");

    member.voice.setChannel(null);

    message.react("👌");
  }
};
