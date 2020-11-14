const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["kick"],
      description: "kick a member.",
      category: "🔔Administrator",
      usage:`<member> [reason]`,
    });
  }

  async run(message, args) {
    let Kmember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!Kmember)
      return message.channel.send("Please mention a user to be muted!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    let embed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField("Moderation:", "Kick")
      .addField("Kicked:", Kmember.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "Missing the required `Kick members or Administrator` permission.!"
      );
    Kmember.send(
      `Hello, you have been kicked from ${message.guild.name} for: ${reason}.\n `
    )
      .then(() => Kmember.kick())
      .catch((err) => console.log(err));

    message.channel
      .send(`**${Kmember.user.tag}** has been kicked`)
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
