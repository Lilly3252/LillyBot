const Event = require("../../Structures/Event");
const { Message, MessageEmbed } = require("discord.js");
const diff = require("diff");
const { Util } = require("discord.js");
const Guild = require("../../Database/models/Guild");

module.exports = class extends (
  Event
) {
  async run(oldMessage = Message, newMessage = Message) {
    if (
      !oldMessage.guild ||
      !newMessage.guild ||
      oldMessage.author.bot ||
      newMessage.author.bot
    )
      return;
if (message.content.includes("https:")){return}
    const settings = await Guild.findOne({
      guildID: oldMessage.guild.id,
    });
    if (settings.messageUpdateMode === false) {
      return;
    }
    if (newMessage) {
      try {
        const embed = new MessageEmbed()
          .setAuthor(
            `${newMessage.author.tag} (${newMessage.author.id})`,
            newMessage.author.displayAvatarURL()
          )
          .addField("❯ Channel", newMessage.channel);
        let msg = "";
        if (
          /```(.*?)```/s.test(oldMessage.content) &&
          /```(.*?)```/s.test(newMessage.content)
        ) {
          const strippedOldMessage = /```(?:(\S+)\n)?\s*([^]+?)\s*```/.exec(
            oldMessage.content
          );
          if (!strippedOldMessage || !strippedOldMessage[2]) return;
          const strippedNewMessage = /```(?:(\S+)\n)?\s*([^]+?)\s*```/.exec(
            newMessage.content
          );
          if (!strippedNewMessage || !strippedNewMessage[2]) return;
          if (strippedOldMessage[2] === strippedNewMessage[2]) return;
          const diffMessage = diff.diffLines(
            strippedOldMessage[2],
            strippedNewMessage[2],
            { newlineIsToken: true }
          );
          for (const part of diffMessage) {
            if (part.value === "\n") continue;
            const d = part.added ? "+ " : part.removed ? "- " : "";
            msg += `${d}${part.value.replace(/\n/g, "")}\n`;
          }
          const prepend = "```diff\n";
          const append = "\n```";
          embed.addField(
            "❯ Modified Message",
            `${prepend}${msg.substring(0, 1000)}${append}`
          );
        } else {
          const diffMessage = diff.diffWords(
            Util.escapeMarkdown(oldMessage.content),
            Util.escapeMarkdown(newMessage.content)
          );
          for (const part of diffMessage) {
            const markdown = part.added ? "**" : part.removed ? "~~" : "";
            msg += `${markdown}${part.value}${markdown}`;
          }
          embed.addField(
            "❯ Modified Message",
            `${msg.substring(0, 1020)}` || "\u200b"
          );
        }
        embed
          .addField(
            "Link!!",
            `[Click here to see the message](${newMessage.url})`,
            true
          )
          .setTimestamp(
            oldMessage.editedAt || newMessage.editedAt || new Date()
          )
          .setFooter("Edited");
        const channelLogs = oldMessage.guild.channels.cache.get(
          settings.logchannelID
        );
        if (!channelLogs) return;
        channelLogs.send(embed);
      } finally {
        if (!newMessage) {
          return;
        }
      }
    }
  }
};
