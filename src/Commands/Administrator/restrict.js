const Command = require("../../Structures/Command");
const Guild = require("../../Database/models/Guild");
const {MessageEmbed} = require("discord.js")

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["restrict"],
      category: "🔔Administrator",
      description: "Adds a restrict role to a Guild Member",
      usage: "<restriction> + <GuildMember> + [reason]",
      userPerms: ["ADMINISTRATOR"],
      botPerm: ["ADMINISTRATOR"] || ["MANAGE_ROLES"],
    });
  }

  async run(message, args) {
    const settings = await Guild.findOne({
        guildID: message.guild.id,
      });

    const restrict_action = args[0];
    
    const Rmember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    
    const reason = args.slice(2).join(" ") || "No reason given.";
    
    let embed = new MessageEmbed()
    .setAuthor(
        `${message.author.tag} (${message.author.id})`,
        message.author.displayAvatarURL()
      )
          .setTitle("Restricted!")
          .setColor("DARK_ORANGE")
          .addField("Moderation", [
            `**❯ Action:** ${restrict_action} restriction`,
            `**❯ Member:** ${Rmember.user.username}`,
            `**❯ Moderator:** ${message.author.tag} `,
            `**❯ Reason:** ${reason}`,
          ])
          .setTimestamp(new Date())
          .setFooter(`${restrict_action} restricted`);;

    switch (restrict_action) {
      case "embed":
        let embed_restrict = message.guild.roles.cache.find(
          (r) => r.name === "Embed Restriction"
        );
        if (!embed_restrict) {
          // creates the role named Embed Restriction
          try {
            embed_restrict = await message.guild.roles.create({
              data: {
                name: "Embed Restriction",
                color: "#514f48",
              },
            });
            message.guild.channels.cache.forEach(async (channel, id) => {
              await channel.updateOverwrite(embed_restrict, {
                EMBED_LINKS: false,
                ATTACH_FILES: false,
              });
            });
          } catch (e) {
            console.log(e.stack);
          }
        }
        Rmember.roles.add(embed_restrict).then(() => {
          Rmember.send(
            `Hello, you have been restricted in ${message.guild.name} for: ${reason}`
          ).catch((err) => console.log(err));
          message.channel.send(
            `${Rmember.user.username} was successfully restricted.`
          );
        });
        break;
    }

    switch (restrict_action) {
      case "reaction":
        let react_restrict = message.guild.roles.cache.find(
          (r) => r.name === "Reaction Restriction"
        );
        if (!react_restrict) {
          // creates the role named Reaction Restriction
          try {
            react_restrict = await message.guild.roles.create({
              data: {
                name: "Reaction Restriction",
                color: "#514f48",
              },
            });
            message.guild.channels.cache.forEach(async (channel, id) => {
              await channel.updateOverwrite(react_restrict, {
                ADD_REACTIONS: false,
              });
            });
          } catch (e) {
            console.log(e.stack);
          }
        }
        Rmember.roles.add(react_restrict).then(() => {
          Rmember.send(
            `Hello, you have been restricted in ${message.guild.name} for: ${reason}`
          ).catch((err) => console.log(err));
          message.channel.send(
            `${Rmember.user.username} was successfully restricted.`
          );
        });
        break;
    }

    switch (restrict_action) {
      case "voice":
        let voice_restrict = message.guild.roles.cache.find(
          (r) => r.name === "Voice Restriction"
        );
        if (!voice_restrict) {
          // creates the role named Voice Restriction
          try {
            voice_restrict = await message.guild.roles.create({
              data: {
                name: "Voice Restriction",
                color: "#514f48",
              },
            });
            message.guild.channels.cache.forEach(async (channel, id) => {
              await channel.updateOverwrite(voice_restrict, {
                STREAM: false,
                CONNECT: false,
                SPEAK: false,
                USE_VAD: false,
              });
            });
          } catch (e) {
            console.log(e.stack);
          }
        }
        Rmember.roles.add(voice_restrict).then(() => {
          Rmember.send(
            `Hello, you have been restricted in ${message.guild.name} for: ${reason}`
          ).catch((err) => console.log(err));
          message.channel.send(
            `${Rmember.user.username} was successfully restricted.`
          );
        });
        break;
    }
    const ModeratorChannel = settings.logchannelID
          if (!ModeratorChannel || ModeratorChannel === null) {
            return
          }
          message.client.channels.cache.get(ModeratorChannel).send(embed);
  }
};
