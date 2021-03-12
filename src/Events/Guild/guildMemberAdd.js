const Event = require("../../Structures/Event.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const Guild = require("../../Database/models/Guild.js");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false,
    });
  }

  async run(member) {
    if (!member.guild) return;
    const settings = await Guild.findOne({
      guildID: member.guild.id,
    });
    if (settings.antiRaidMode === false) {
      const embedantiraidmodefalse = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(
          `${member.user.tag} (${member.id})`,
          member.user.displayAvatarURL()
        )
        .setFooter("User joined")
        .setTimestamp(new Date());

      const ModeratorChannel = settings.logchannelID;
      if (!ModeratorChannel || ModeratorChannel === null) {
        return;
      }
      member.client.channels.cache
        .get(ModeratorChannel)
        .send(embedantiraidmodefalse);
    } else {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          `${member.user.tag} (${member.id})`,
          member.user.displayAvatarURL()
        )
        .setFooter("User joined")
        .setTimestamp(new Date());

      const ModeratorChannel = settings.logchannelID;
      if (!ModeratorChannel || ModeratorChannel === null) {
        return;
      }
      member.client.channels.cache.get(ModeratorChannel).send(embed);
    }
  }
};
