const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild");
module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["ban"],
      description: "Ban a member.",
      category: "🔔Administrator",
      usage: `<member> [reason]`,
      userPerms: ["ADMINISTRATOR"] || ["BAN_MEMBERS"],
      botPerms: ["ADMINISTRATOR"] || ["BAN_MEMBERS"],
    });
  }

  async run(message, args) {
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });

    let Bmember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!Bmember)
      return message.channel.send("Please mention a user to be banned!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    let embed = new MessageEmbed()
      .setTitle("Ban Hammer Used!")
      .setColor("RED")
      .addField("Moderation", [
        `**❯ Action:** Ban`,
        `**❯ Member:** ${Bmember.user.username}`,
        `**❯ Moderator:** ${message.author.tag} `,
        `**❯ Reason:** ${reason}`,
      ])
      .setFooter(`Date: ${message.createdAt.toLocaleString()}`);

    Buser.send(
      `Hello, you have been banned from ${message.guild.name} for: ${reason}`
    )
      .then(() => message.guild.ban(Bmember))
      .catch((err) => console.log(err));
    message.channel.send(`**${Bmember.user.tag}** has been banned`);

    const channelLogs = message.guild.channels.cache.get(settings.logchannelID);
    if (!channelLogs) return;
    channelLogs.send(embed);
  }
};
