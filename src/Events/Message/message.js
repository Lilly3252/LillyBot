const Event = require("../../Structures/Event");
const config = require("../../config.json");
const mongoose = require("mongoose");
const Guild = require("../../Database/models/Guild");
const { MessageEmbed } = require("discord.js");

module.exports = class extends (
  Event
) {
  async run(message) {
    if (!message.guild || message.author.bot) return;
    const settings = await Guild.findOne(
      {
        guildID: message.guild.id,
      },
      (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
          const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: config.prefix,
          });

          newGuild
            .save()
            .then((result) => console.log(result))
            .catch((err) => console.error(err));

          return message.channel
            .send(
              "This server was not in our database! We have now added and you should be able to use bot commands."
            )
            .then((m) => m.delete({ timeout: 10000 }));
        }
      }
    );
    // Listening mentions
    //bot mentions
    if (message.content === `<@!${message.guild.me.id}>`){ 
      message.channel.send(
        `My prefix for ${message.guild.name} is \`${settings.prefix}\`.`
      )
    };
    //creator mentions (me)
    if (message.mentions.has("165922734461812736")) {
      message.client.users.cache
        .get("165922734461812736")
        .send(
          `${message.member.user.tag} mentioned your name inside ${settings.guildName}!\n Context: ${message.content}\n<${message.url}>`
        );
    };
    //moderator role get through database + message sent to the moderator channel
    const ModeratorMentionned = settings.moderatorRoleID;
    const ModeratorChannel = settings.logchannelID;
    if (message.mentions.has(ModeratorMentionned)) {
      message.client.channels.cache
        .get(ModeratorChannel)
        .send( new MessageEmbed()
        .setTitle('Moderator Mentioned')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription([
          `**Person who mentioned**: ${message.member}`,
          `**Channel**: ${message.channel}`,
          `**Content**: ${message.content}`,
        ])
        .addField('\u200b',`[Click here to see the message](${message.url})`));
        if(!ModeratorChannel && !ModeratorMentionned) return;
    };

    //normal listening event
    const prefix = settings.prefix;
    if (!message.content.startsWith(prefix)) return;

    const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const command =
      this.client.commands.get(cmd.toLowerCase()) ||
      this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
    if (command) {
      if (
        command.ownerOnly &&
        !this.client.utils.checkOwner(message.author.id)
      ) {
        return message.reply(
          "Sorry, this command can only be used by the bot owners."
        );
      }

      if (command.guildOnly && !message.guild) {
        return message.reply(
          "Sorry, this command can only be used in a discord server."
        );
      }

      if (command.nsfw && !message.channel.nsfw) {
        return message.reply(
          "Sorry, this command can only be ran in a NSFW marked channel."
        );
      }

      if (command.args && !args.length) {
        return message.reply(
          `Sorry, this command requires arguments to function. Usage: ${
            command.usage
              ? `${this.client.prefix + command.name} ${command.usage}`
              : "This command doesn't have a usage format"
          }`
        );
      }

      if (message.guild) {
        const userPermCheck = command.userPerms
          ? this.client.defaultPerms.add(command.userPerms)
          : this.client.defaultPerms;
        if (userPermCheck) {
          const missing = message.channel
            .permissionsFor(message.member)
            .missing(userPermCheck);
          if (missing.length) {
            return message.reply(
              `You are missing ${this.client.utils.formatArray(
                missing.map(this.client.utils.formatPerms)
              )} permissions, you need them to use this command!`
            );
          }
        }

        const botPermCheck = command.botPerms
          ? this.client.defaultPerms.add(command.botPerms)
          : this.client.defaultPerms;
        if (botPermCheck) {
          const missing = message.channel
            .permissionsFor(this.client.user)
            .missing(botPermCheck);
          if (missing.length) {
            return message.reply(
              `I am missing ${this.client.utils.formatArray(
                missing.map(this.client.utils.formatPerms)
              )} permissions, I need them to run this command!`
            );
          }
        }
      }

      command.run(message, args);
    }
  }
};
