const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild");
module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["unmute"],
      description: "unmute a member.",
      category: "🔔Administrator",
      usage: "<MentionMember>",
      userPerms: ["ADMINISTRATOR"],
      botPerms: ["MANAGE_ROLES", "MUTE_MEMBERS"],
    });
  }

  async run(message, args) {
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });
    let Mmember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!Mmember)
      return message.channel.send("Please mention a user to be unmuted!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    let embed = new MessageEmbed()
      .setTitle("Congratulation!")
      .setColor("GREEN")
      .addField("Moderation", [
        `**❯ Action:** Unmute`,
        `**❯ Member:** ${Mmember.user.username}`,
        `**❯ Moderator:** ${message.author.tag} `,
        `**❯ Reason:** ${reason}`,
      ])
      .setFooter(`Date: ${message.createdAt.toLocaleString()}`);

    let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
    if (!muterole) {
      // creates the muted role
      try {
        muterole = await message.guild.roles.create({
          data: {
            name: "Muted",
            color: "#514f48",
            permissions: [],
          },
        });
        message.guild.channels.forEach(async (channel, id) => {
          await channel.updateOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false,
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }

    //remove role to the mentioned user and also send the user a dm.
    if (!Mmember.roles.cache.has(muterole.id))
      return message.channel.send("This member has no mute role.");
    Mmember.roles.remove(muterole.id).then(() => {
      Mmember.send(
        `Hello, you have been unmuted in ${message.guild.name}. Congratulation!`
      ).catch((err) => console.log(err));
      message.channel.send(
        `${Mmember.user.username} was successfully unmuted.`
      );
    });
    const channelLogs = message.guild.channels.cache.get(settings.logchannelID);
    if (!channelLogs) return;
    channelLogs.send(embed);
  }
};
