const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["ban"],
      description: "Ban a member.",
      category: "🔔Administrator",
      usage:`<member> [reason]`,
    });
  }

  async run(message, args) {
    let Bmember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!Bmember)
      return message.channel.send("Please mention a user to be muted!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    let embed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField("Moderation:", "Banned")
      .addField("Banned:", Bmember.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "Missing the required `Ban Members or Administrator` permission.!"
      );
    Wuser.send(
      `Hello, you have been banned from ${message.guild.name} for: ${reason}`
    )
      .then(() => message.guild.ban(Bmember))
      .catch((err) => console.log(err));
    message.channel
      .send(`**${Bmember.user.tag}** has been banned`)
      .then((m) => m.delete(5000));

    const channelLogs = message.guild.channels.cache.find(
      (Channel) =>
        Channel.name == "logs" ||
        Channel.name == "modlog" ||
        Channel.name == "bot-log"
    );
    if (!channelLogs) return;
    channelLogs.send(embed);
  }
};
