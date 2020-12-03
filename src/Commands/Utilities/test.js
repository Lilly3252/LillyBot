const { MessageCollector, MessageEmbed , MessageAttachment } = require("discord.js");
const Command = require("../../Structures/Command");
const emoji = require('./../../Structures/emoji.json');
module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["test"],
      category: "📝Utilities",
    });
    this.ownerOnly = true;
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {

    const attachment = new MessageAttachment('Pictures/Test-Computer-Key-by-Stuart-Miles.jpg', 'flash.png');
const embed = new MessageEmbed()
     .setTitle(`Test Embed ${emoji[":blob_nomcookie:"]}`)
     .attachFiles(attachment)
     .setImage('attachment://flash.png');

message.channel.send({embed});
}}
