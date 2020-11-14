const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["unmute"],
      description: "unmute a member.",
      category: "🔔Administrator",
      usage:`<member> [reason]`,
    });
  }

  async run(message, args) {
    let Mmember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!Mmember)
      return message.channel.send("Please mention a user to be muted!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    let embed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField("Moderation:", "Unmuted")
      .addField("Unmuted:", Mmember.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    if (
      !message.guild.me.hasPermission([
        "MANAGE_ROLES",
        "MUTE_MEMBERS",
        "ADMINISTRATOR",
      ])
    )
      return message.channel.send(
        "Missing the required `Manage Role and Mute Members or Administrator` permission.!"
      );
    let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
    if (!muterole) {
      // creates the muted role
      try {
        muterole = await message.guild.create({
          name: "Muted",
          color: "#514f48",
          permissions: [],
        });
        message.guild.channels.each(async (channel, id) => {
          await channel.updatePermissions(muterole, {
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
    Mmember.roles.remove(muterole.id).then(() => {
      Mmember.send(
        `Hello, you have been unmuted in ${message.guild.name}.Congratulation!`
      ).catch((err) => console.log(err));
      message.channel
        .send(`${Mmember.user.username} was successfully unmuted.`)
        .then((m) => m.delete(5000));
    });
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
