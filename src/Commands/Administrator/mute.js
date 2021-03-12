const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const Guild = require("../../Database/models/Guild");
const mongoose = require("mongoose");
const MuteSchema = require("../../Database/models/MuteSchema");
const ms = require("ms");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["mute"],
      description: "mute a member.",
      category: "🔔Administrator",
      usage: `<member> [reason]`,
      userPerms: ["ADMINISTRATOR"] || ["MUTE_MEMBERS"],
      botPerm: ["ADMINISTRATOR"] || ["MUTE_MEMBERS", "MANAGE_ROLES"],
    });
  }

  async run(message, args) {
    const settings = await Guild.findOne({
      guildID: message.guild.id,
    });

    let Mmember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    let time = args[1] || "Unlimited time";
    let reason = args.slice(2).join(" ") || "No reason given.";
    //searching the member
    const Mute = await MuteSchema.findOne(
      {
        user_id: Mmember,
        guild_id: message.guild.id,
      },
      async (err, mute) => {
        if (err) console.error(err);
        // if the member is already muted
        if (mute) {
          return message.channel.send(
            "This member is already muted,you cannot mute this member twice"
          );
        }
        //if the member is not muted
        if (!mute) {
          const newMute = new MuteSchema({
            _id: mongoose.Types.ObjectId(),
            user_id: Mmember,
            guild_id: message.guild.id,
            reason: reason,
            time: time,
          });

          if (!Mmember) {
            return message.channel.send("Please mention a user to be muted!");
          }
          let muterole = message.guild.roles.cache.find(
            (r) => r.name === "Muted"
          );
          if (!muterole) {
            // creates the muted role
            try {
              muterole = await message.guild.roles.create({
                data: {
                  name: "Muted",
                  color: "#514f48",
                  permissions: [],
                },
              });
              message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.updateOverwrite(muterole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  SEND_TTS_MESSAGES: false,
                  ATTACH_FILES: false,
                  SPEAK: false,
                });
              });
            } catch (e) {
              console.log(e.stack);
            }
          }

          //add role to the mentioned user and also send the user a dm explaining where and why they were muted
          Mmember.roles.add(muterole.id).then(() => {
            Mmember.send(
              `Hello, you have been muted in ${message.guild.name} for: ${reason}`
            ).catch((err) => console.log(err));
            message.channel.send(
              `${Mmember.user.username} was successfully muted.`
            );
            if (time) {
              //set a timeout
              setTimeout(
                async function () {
                  await Mmember.roles.remove(
                    muterole.id,
                    `Temporary mute expired.`
                  )
                  .then(
                    newMute.deleteOne({
                      user_id: Mmember,
                      guild_id: message.guild.id,
                    })
                  )
                },
                ms(time));
            }
          });
          newMute
            .save()
            .then((result) => console.log(result))
            .catch((err) => console.error(err));
        }

        let embed = new MessageEmbed()
          .setTitle("SShhhh")
          .setColor("YELLOW")
          .addField("Moderation", [
            `**❯ Action:** Mute`,
            `**❯ Member:** ${Mmember.user.username}`,
            `**❯ Moderator:** ${message.author.tag} `,
            `**❯ Reason:** ${reason}`,
            `**❯ Time:** ${time}`,
          ])
          .setFooter(`Date: ${message.createdAt.toLocaleString()}`);
          const ModeratorChannel = settings.logchannelID
          if (!ModeratorChannel || ModeratorChannel === null) {
            return
          }
          message.client.channels.cache.get(ModeratorChannel).send(embed);
      }
    );
  }
};
