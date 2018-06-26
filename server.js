const Discord = require("discord.js")
const client = new Discord.Client();
const fs = require("fs");
const ms = require("ms");
const moment = require("moment");
require("moment-duration-format");

const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};


const music = require('discord.js-musicbot-addon');

music.start(client, { //start music bot
  youtubeKey: "AIzaSyAAKSiOkapv22Kt3OWNOAWeTcXJ0yLmJ90",
  prefix: "-",
  helpCmd: "mhelp",
  thumbnailType: "high",
  maxQueueSize: "10",
  enableQueueStat: true,
  anyoneCanAdjust: true,
  anyoneCanLeave: true,
  ownerOverMember: true,
  clearOnLeave: true,
  botOwner: "368756694114893825"
}); //end music bot

client.on('guildMemberAdd', member => {
//actual welcome channel, id: 413023284293271552
client.channels.get('461161101699317760').send(`Welcome to **!Prestige ❤**, ${member}, you are now **prestigious** | <a:partyblob:411974992004120587><a:partyblob:411974992004120587>Updated Member Count: ${member.guild.memberCount}! <a:partyblob:411974992004120587><a:partyblob:411974992004120587>`)
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: `with !Prestige ❤`, type: 0 }});
});

client.on('message', async msg => { // START MESSAGE HANDLER
  if (msg.author.bot) return;
  
  let args = msg.content.split(" ");
  
  
  if (msg.content.toLowerCase().startsWith('-warn')) { //START WARN CMD
    if (!msg.member.roles.some(r => ["STAFF"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    var warnmemb = msg.mentions.members.first();
    var warnmsg = args.splice(1).slice(1).join(' ');
    if (!warnmemb) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please mention a valid member to warn!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!warnmsg) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please provide a reason for the warn!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    warnmemb.send({
      embed: {
        color: 0xFFB400,
        description: `You have been **warned** in **! Prestige \:heart:** by ${msg.author}! \n\n**Reason:** ${warnmsg}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.channel.send({
      embed: {
        color: 0x3BF601,
        description: `<:approve:459473995453038612> ${warnmemb} was successfully warned!`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.guild.channels.find('name', 'punish-logs').send({
      embed: {
        color: 0xFFB400,
        description: `${warnmemb} was **warned**! \n\n**Reason:** ${warnmsg}\n\n**Warned by** ${msg.author}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })

  } //END WARN CMD


  if (msg.content.toLowerCase().startsWith('-kick')) { //START KICK CMD
    if (!msg.member.roles.some(r => ["STAFF"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    var kickmemb = msg.mentions.members.first();
    var kickmsg = args.splice(1).slice(1).join(' ');
    if (!kickmemb) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please mention a valid member to kick!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!kickmsg) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please provide a reason for the kick!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!kickmemb.kickable) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> This member is not kickable!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    kickmemb.send({
      embed: {
        color: 0xFF0000,
        description: `You have been **kicked** from **! Prestige \:heart:** by ${msg.author}! \n\n**Reason:** ${kickmsg}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        },
        thumbnail: {
        url: "https://vignette.wikia.nocookie.net/spongebob/images/5/54/SpongeBob_kicked_out_of_the_museum.GIF/revision/latest?cb=20141115021259"
        } //this one too:  https://media.giphy.com/media/zfpYRDqJuCy1G/giphy.gif
      }
    })

    kickmemb.kick(kickmsg).catch(error => msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: `<:deny:459474016324026398> An error ocurred. Err Msg: ${error}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    }))
    msg.channel.send({
      embed: {
        color: 0x3BF601,
        description: `<:approve:459473995453038612> ${kickmemb} was successfully kicked!`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.guild.channels.find('name', 'punish-logs').send({
      embed: {
        color: 0xFF0000,
        description: `${kickmemb} was **kicked**! \n\n**Reason:** ${kickmsg}\n\n**Kicked by** ${msg.author}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })


  } // END KICK CMD
  if (msg.content.toLowerCase().startsWith('-ban')) { //START BAN CMD
    if (!msg.member.roles.some(r => ["STAFF"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    var banmemb = msg.mentions.members.first();
    var banmsg = args.splice(1).slice(1).join(' ');
    if (!banmemb) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please mention a valid member to ban!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!banmsg) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please provide a reason for the ban!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!banmemb.bannable) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> This member is not bannable!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    banmemb.send({
      embed: {
        color: 0x000000,
        description: `You have been **banned** from **! Prestige \:heart:** by ${msg.author}! \n\n**Reason:** ${banmsg} `,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        },
        thumbnail: {
        url: "http://www.reactiongifs.com/r/perma_banned.gif"
        }
      }
    })

    banmemb.ban(banmsg).catch(error => msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: `<:deny:459474016324026398> An error ocurred. Err Msg: ${error}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    }))
    msg.channel.send({
      embed: {
        color: 0x3BF601,
        description: `<:approve:459473995453038612> ${banmemb} was successfully banned!`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.guild.channels.find('name', 'punish-logs').send({
      embed: {
        color: 0x000000,
        description: `${banmemb} was **banned**! \n\n**Reason:** ${banmsg}\n\n**Banned by** ${msg.author}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
  } // END BAN CMD
  
  
  if (msg.content.toLowerCase().startsWith('-userinfo')) {
  const member = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.member;
  if (!member) return msg.reply("Please provide a vaild Mention or USER ID");
  let bot;
  if (member.user.bot === true) {
    bot = "Yes";
  } else {
    bot = "No";
  }
  const embed = new Discord.RichEmbed()
    .setColor(0x000000)
    .setThumbnail(`${member.user.displayAvatarURL()}`)
    .setAuthor(`${member.user.tag} (${member.id})`, `${member.user.avatarURL()}`)
    .addField("Nickname:", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "No nickname"}`, true)
    .addField("Bot?", `${bot}`, true)
    .addField("Guild", `${bot}`, true)
    .addField("Status", `${status[member.user.presence.status]}`, true)
    .addField("Playing", `${member.user.presence.game ? `${member.user.presence.game.name}` : "not playing anything."}`, true)
    .addField("Roles", `${member.roles.filter(r => r.id !== msg.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
    .addField("Joined At", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
.addField("Created At", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true);
  msg.channel.send(
    embed
);
  
  }
  
  if (msg.content.toLowerCase().startsWith('-serverinfo')) {
  let sicon = msg.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor(0x000000)
    .setThumbnail(sicon)
    .addField("Server Name", msg.guild.name)
    .addField("Created On", msg.guild.createdAt)
    .addField("You Joined", msg.member.joinedAt)
    .addField("Total Members", msg.guild.memberCount);

msg.channel.send(serverembed);
  
  }
  if (msg.content.startsWith('-ping')) {
    msg.channel.send("Pinging... :signal_strength:").then(sent => {
      sent.edit(`:ping_pong: Pong! | Time Taken: ${sent.createdTimestamp - msg.createdTimestamp}ms`)
    })
  }

  if (msg.content.startsWith('-8ball')) {
  const answers = [
  'Without a doubt', 'Extremely likely', 'Perhaps', 'Maybe', 'I\'ll have to think about that', 'Not a chance!'
]
  var argss = msg.content.split(" ").slice(1);
  let question = argss[0]
  
  msg.channel.send(`:8ball: | ${answers[Math.floor(Math.random() * answers.length)]}`);
  
}
  
  if (msg.content.toLowerCase().startsWith('-help')) {
  msg.channel.send(`\`\`\`asciidoc
= General =
-ping :: Hm. I wonder what this does? /sarcasm
-8ball :: Ask the magic 8ball a question. Pretty self explanatory
-help :: Brings up this menu
-serverinfo :: Shows information about the server
-userinfo :: Show information about a specified user

= Moderation =
Can only be used by staff
-warn @user <reason> :: Warns a user with the specified reason and logs it
-kick @user <reason> :: Kicks a user with the specified reason and logs it
-ban @user <reason> :: Bans a user with the specfified reason and logs it\`\`\``)
  }
  }) //END MESSAGE HANDLER
  
  client.login(process.env.BOT_TOKEN)
