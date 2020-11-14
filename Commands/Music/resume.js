const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["resume"],
      category: "🎧Music"
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send("▶ Resumed the music for you!");
    }
    return message.channel.send("There is nothing playing.");
  }
};
