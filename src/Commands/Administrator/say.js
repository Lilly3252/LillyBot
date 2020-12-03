const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["test"],
      category: "🔔Administrator",
      description:"Echo your message to this channel or to another channel",
      usage:"[ChannelMention] <message>",
      userPerms : ['ADMINISTRATOR'] || ['MANAGE_MESSAGES'],
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    let argsresult;
    let mChannel = message.mentions.channels.first();

    message.delete();
    if (mChannel) {
      argsresult = args.slice(1).join(" ");
      mChannel.send(argsresult);
    } else {
      argsresult = args.join(" ");
      message.channel.send(argsresult);
    }
  }
};