const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild");
module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["mute"],
      description: "mute a member.",
      category: "🔔Administrator",
      usage: "<member> [reason]",
      userPerms: ["ADMINISTRATOR"] || ["MUTE_MEMBERS"],
      botPerm: ["ADMINISTRATOR"] || ["MUTE_MEMBERS", "MANAGE_ROLES"],
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
      return message.channel.send("Please mention a user to be muted!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    let embed = new MessageEmbed()
      .setTitle("SShhhh")
      .setColor("YELLOW")
      .addField("Moderation", [
        `**❯ Action:** Mute`,
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
        message.guild.channels.cache.forEach(async (channel, id) => {
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

    //add role to the mentioned user and also send the user a dm explaing where and why they were muted
    Mmember.roles.add(muterole.id).then(() => {
      Mmember.send(
        `Hello, you have been muted in ${message.guild.name} for: ${reason}`
      ).catch((err) => console.log(err));
      message.channel.send(`${Mmember.user.username} was successfully muted.`);
    });

    const channelLogs = message.guild.channels.cache.get(settings.logchannelID);
    if (!channelLogs) return;
    channelLogs.send(embed);
  }
};
