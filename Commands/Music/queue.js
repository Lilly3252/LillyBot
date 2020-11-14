const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["queue"],
      category: "🎧Music"
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There is nothing playing.");
    return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map((song) => `**-** ${song.title}`).join("\n")}
**Now playing:** ${serverQueue.songs[0].title}
		`);
  }
};
