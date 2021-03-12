const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["settings"],
      description: "This command is for setting up your guild.",
      category: "🔔Administrator",
      usage:
        "+<ShowSettings>|<Anti-Raid>|<WelcomeChannel>|<ModLog>|<ModRole>|<Prefix>|<DeleteMessages>|<messageDeleteBulk>|<MessageUpdates>|<WelcomeMessage>",
      userPerms: ["ADMINISTRATOR"],
    });
  }

  async run(message, args) {
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });

    if (!args[0]) {
      message.channel.send(
        "You need to tell me at least 1 argument \n <ShowSettings>|<Anti-Raid>|<WelcomeChannel>|<ModLog>|<ModRole>|<Prefix>|<DeleteMessages>|<messageDeleteBulk>|<MessageUpdates>|<WelcomeMessage>"
      );
    }

    switch (args[0]) {
    case "ShowSettings":
      const SettingEmbed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Settings`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription([
          `**❯ Prefix:** ${settings.prefix}`,
          `**❯ WelcomeChannelID:**${
            settings.welcomechannelID
              ? settings.welcomechannelID
              : "Not defined yet"
          }`,
          `**❯ ModLogChannelID:** ${
            settings.logchannelID ? settings.logchannelID : "Not defined yet"
          }`,
          `**❯ ModRoleID:** ${
            settings.moderatorRoleID
              ? settings.moderatorRoleID
              : "Not defined yet"
          } `,
          `**❯ WelcomeMessage:**${
            settings.PersonalizedWelcomeMessage
              ? settings.PersonalizedWelcomeMessage
              : "Not defined yet"
          }`,
          `**❯ Anti-raid:** ${
            settings.antiRaidMode ? settings.antiRaidMode : false
          }`,
          `**❯ MessageDelete** ${
            settings.messageDeleteMode ? settings.messageDeleteMode : false
          }`,
          `**❯ messageBulkDelete** ${
            settings.messageBulkDeleteMode
              ? settings.messageBulkDeleteMode
              : false
          }`,
          `**❯ MessageUpdate:** ${
            settings.messageUpdateMode ? settings.messageUpdateMode : false
          }`,
        ])
        .setFooter(
          `Requested by ${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.channel.send(SettingEmbed);
      break;
    }

    switch (args[0]) {
    case "Anti-Raid":
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
      break;
    }

    switch (args[0]) {
    case "MessageUpdates":
      if (args[1] === "true") {
        await settings.updateOne({
          messageUpdateMode: true,
        });
        message.channel.send("✅ MessageUpdate has been enable.");
      }
      if (args[1] === "false") {
        await settings.updateOne({
          messageUpdateMode: false,
        });
        message.channel.send("❌ MessageUpdate has been disable.");
      }
      break;
    }

    switch (args[0]) {
    case "MessageDeletes":
      if (args[1] === "true") {
        await settings.updateOne({
          messageDeleteMode: true,
        });
        message.channel.send("✅ MessageDelete has been enable.");
      }
      if (args[1] === "false") {
        await settings.updateOne({
          messageDeleteMode: false,
        });
        message.channel.send("❌ MessageDelete has been disable.");
      }
      break;
    }

    switch (args[0]) {
    case "messageBulkDelete":
      if (args[1] === "true") {
        await settings.updateOne({
          messageBulkDeleteMode: true,
        });
        message.channel.send("✅ messageDeleteBulk has been enable.");
      }
      if (args[1] === "false") {
        await settings.updateOne({
          messageBulkDeleteMode: false,
        });
        message.channel.send("❌ MessageDeleteBulk has been disable.");
      }
      break;
    }

    switch (args[0]) {
    case "WelcomeChannel":
      const WelcomeChannel = args[1];
      if (isNaN(WelcomeChannel) && args[1] === "false") {
        await settings.updateOne({
          welcomechannelID: null,
        });
      }
      if (isNaN(WelcomeChannel) && args[1] !== "false") {
        message.channel
          .send("❌ You need to give me a channelID to set this setting.")
          .then((m) => m.delete({ timeout: 10000 }));
      } else {
        await settings
          .updateOne({
            welcomechannelID: WelcomeChannel,
          })
          .then(() =>
            message.channel.send(
              `✅ Welcome Channel has been set to ${WelcomeChannel}`
            )
          );
      }
      break;
    }

    switch (args[0]) {
    case "ModLog":
      const ModLogChannel = args[1];
      if (isNaN(ModLogChannel) && args[1] === "false") {
        await settings.updateOne({
          logchannelID: null,
        });
      }
      if (isNaN(ModLogChannel) && args[1] !== "false") {
        message.channel
          .send("❌ You need to give me a channelID to set this setting.")
          .then((m) => m.delete({ timeout: 10000 }));
      } else {
        await settings
          .updateOne({
            logchannelID: ModLogChannel,
          })
          .then(() =>
            message.channel.send(
              `✅ ModLog Channel has been set to ${ModLogChannel}`
            )
          );
      }
      break;
    }

    switch (args[0]) {
    case "Prefix":
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
      break;
    }

    switch (args[0]) {
    case "ModRole":
      const ModroleID = args[1];
      if (isNaN(ModroleID) && args[1] === "false") {
        await settings.updateOne({
          moderatorRoleID: null,
        });
      } else {
        await settings.updateOne({
          moderatorRoleID: ModroleID,
        });
        message.channel.send(`✅ ModRole has been set to ${ModroleID}`);
      }
      break;
    }

    switch (args[0]) {
    case "WelcomeMessage":
      const WelcomeMessage = args.slice(1).join(` `);
      if (isNaN(WelcomeMessage) && args[1] === "false") {
        await settings.updateOne({
          PersonalizedWelcomeMessage: null,
        });
      } else {
        await settings.updateOne({
          PersonalizedWelcomeMessage: WelcomeMessage,
        });
        message.channel.send(
          `✅ Welcome Message has been set to ${WelcomeMessage}`
        );
      }
      break;
    }
  }
};