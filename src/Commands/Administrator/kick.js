const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild");
module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["kick"],
      description: "kick a member.",
      category: "🔔Administrator",
      usage: `<member> [reason]`,
      userPerms: ["ADMINISTRATOR"] || ["KICK_MEMBERS"],
      botPerms: ["ADMINISTRATOR"] || ["KICK_MEMBERS"],
    });
  }

  async run(message, args) {
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });
    let Kmember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!Kmember)
      return message.channel.send("Please mention a user to be kick!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    let embed = new MessageEmbed()
      .setTitle("Sayonara!")
      .setColor("ORANGE")
      .addField("Moderation", [
        `**❯ Action:** Kick`,
        `**❯ Member:** ${Kmember.user.username}`,
        `**❯ Moderator:** ${message.author.tag} `,
        `**❯ Reason:** ${reason}`,
      ])
      .setFooter(`Date: ${message.createdAt.toLocaleString()}`);

    Kmember.send(
      `Hello, you have been kicked from ${message.guild.name} for: ${reason}.\n `
    )
      .then(() => Kmember.kick())
      .catch((err) => console.log(err));

    message.channel.send(`**${Kmember.user.tag}** has been kicked`);
    const channelLogs = message.guild.channels.cache.get(settings.logchannelID);
    if (!channelLogs) return;
    channelLogs.send(embed);
  }
};
