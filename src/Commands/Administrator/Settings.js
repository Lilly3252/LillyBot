const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["settings"],
      description: "This command is for setting up your guild.",
      category: "🔔Administrator",
      usage: "+<ShowSettings>|<Anti-Raid>|<WelcomeChannel>|<ModLog>|<Prefix>|<DeleteMessages>|<MessageUpdates>",
      userPerms: ["ADMINISTRATOR"],
    });
  }

  async run(message, args) {
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });

    if (!args[0]) {
      message.channel.send(
        "You need to tell me at least 1 argument \n <ShowSettings>|<Anti-Raid>|<WelcomeChannel>|<ModLog>|<ModRole>|<Prefix>|<DeleteMessages>|<MessageUpdates>"
      );
    }

    if (args[0] === "ShowSettings") {
      const SettingEmbed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Settings`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription([
          `**❯Prefix:** ${settings.prefix}`,
          `**❯WelcomeChannelID:**${
            settings.welcomechannelID
              ? settings.welcomechannelID
              : "Not defined yet"
          }`,
          `**❯ModLogChannelID:** ${
            settings.logchannelID ? settings.logchannelID : "Not defined yet"
          }`,
          `**❯ModRoleID:** ${
            settings.moderatorRoleID
              ? settings.moderatorRoleID
              : "Not defined yet"
          } `,
          `**❯Anti-raid:** ${
            settings.antiRaidMode ? settings.antiRaidMode : false
          }`,
          `**❯MessageDelete** ${
            settings.messageDeleteMode ? settings.messageDeleteMode : false
          }`,
          `**❯MessageUpdate:** ${
            settings.messageUpdateMode ? settings.messageUpdateMode : false
          }`,
        ])
        .setFooter(
          `Requested by ${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.channel.send(SettingEmbed);
    }
    if (args[0] === "Anti-Raid") {
      if (args[1] === "on") {
        await settings.updateOne({
          antiRaidMode: true,
        });
        message.channel.send("✅ AntiRaid Mode enable.");
      }
      if (args[1] === "off") {
        await settings.updateOne({
          antiRaidMode: false,
        });
        message.channel.send("❌ AntiRaid Mode disable.");
      }
    }
    if (args[0] === "MessageUpdates") {
      if (args[1] === "on") {
        await settings.updateOne({
          messageUpdateMode: true,
        });
        message.channel.send("✅ MessageUpdate has been enable.");
      }
      if (args[1] === "off") {
        await settings.updateOne({
          messageUpdateMode: false,
        });
        message.channel.send("❌ MessageUpdate has been disable.");
      }
    }
    if (args[0] === "MessageDeletes") {
      if (args[1] === "on") {
        await settings.updateOne({
          messageDeleteMode: true,
        });
        message.channel.send("✅ MessageDelete has been enable.");
      }
      if (args[1] === "off") {
        await settings.updateOne({
          messageDeleteMode: false,
        });
        message.channel.send("❌ MessageDelete has been disable.");
      }
    }
    if (args[0] === "WelcomeChannel") {
      const WelcomeChannel = args[1];
      if (isNaN(WelcomeChannel)) {
        message.channel
          .send("❌ You need to give me a channelID to set this setting.")
          .then((m) => m.delete({ timeout: 10000 }));
      } else {
        await settings.updateOne({
          welcomechannelID: WelcomeChannel,
        });
        message.channel.send(
          `✅ Welcome Channel has been set to ${WelcomeChannel}`
        );
      }
    }
    if (args[0] === "ModLog") {
      const ModLogChannel = args[1];
      if (isNaN(ModLogChannel)) {
        message.channel
          .send("❌ You need to give me a channelID to set this setting.")
          .then((m) => m.delete({ timeout: 10000 }));
      } else {
        await settings.updateOne({
          logchannelID: ModLogChannel,
        });
        message.channel.send(
          `✅ ModLog Channel has been set to ${ModLogChannel}`
        );
      }
    }
    if (args[0] === "Prefix") {
      const prefix = args[1];
      if (prefix.length < 1) {
        return message.channel
          .send(
            `❌ You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\``
          )
          .then((m) => m.delete({ timeout: 10000 }));
      } else {
        await settings.updateOne({
          prefix: prefix,
        });
        message.channel.send(`✅ Your new prefix has been set to ${prefix}`);
      }
    }
    if (args[0] === "ModRole") {
      const ModroleID = args[1];
      if (isNaN(ModroleID)) {
        message.channel
          .send("❌ You need to give me a RoleID to set this setting.")
          .then((m) => m.delete({ timeout: 10000 }));
      } else {
        await settings.updateOne({
          moderatorRoleID: ModroleID,
        });
        message.channel.send(`✅ ModRole has been set to ${ModroleID}`);
      }
    }
  }
};
