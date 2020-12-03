const Command = require("../../Structures/Command");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["test"],
      category: "🔔Administrator",
      description: "Echo your message to this channel or to another channel",
      usage: "[userID]",
      userPerms: ["ADMINISTRATOR"],
    });
  }
  async run(message, args) {
    let userID = args[0];
    if (!args[0]) return message.channel.send("Please give me a userID!");
    if(isNaN(args[0])) return message.channel.send("That ID is not a number !")
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    message.guild.fetchBans().then(async (bans) => {
      if (bans.size == 0)
        return message.channel.send(
          "No one can be unban because there is no user ban in this guild!"
        );
      let bUser = bans.find((b) => b.user.id == userID);
      if (!bUser) return message.channel.send("this user is not banned");
      await message.guild.members
        .unban(bUser.user, reason)
        .catch((err) => console.log(err));
      message.channel.send(`**${bUser.user}** has been unban`);
    });
  }
};
