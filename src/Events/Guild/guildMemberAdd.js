const Event = require("../../Structures/Event.js");
const { MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild.js");
module.exports = class extends (
  Event
) {
  constructor(...args) {
    super(...args, {
      once: false,
    });
  }

  async run(member) {
    if (!member.guild) return;
      const WelcomeChannel = await Guild.findOne({
        guildID: member.guild.id
      })
      if(WelcomeChannel.PersonalizedWelcomeMessage === undefined){return}
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .addField(settings.PersonalizedWelcomeMessage)
      .setFooter("User joined")
      .setTimestamp(new Date());
      const channelLogs = member.guild.channels.cache.get(welcomeChannel.welcomechannelID);
    if (!channelLogs) return;
    channelLogs.send(embed);
  }
};