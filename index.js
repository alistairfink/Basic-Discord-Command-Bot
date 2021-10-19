require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === '!help') {
    msg.channel.send(
      "Help: !help\n" + 
      "Rename: !rename @user new_nickname\n" +
      "Summon: !summon @user count"
    );
  } else if (msg.content.startsWith('!rename')) {
    if (msg.mentions.users.size === 1) {
      let user = msg.mentions.users.first();
      let guildMember = msg.guild.members.fetch(user.id)
      .then(member => {
        let start = 12 + member.id.length;
        if (start >= msg.content.length) {
          msg.channel.send("Usage: !rename @user new_nickname");
          return;
        } 

        let newNickname = msg.content.substring(start);
        member.setNickname(newNickname);
      });
    } else {
      msg.channel.send("Usage: !rename @user new_nickname");
    }
  } else if (msg.content.startsWith('!summon')) {
    if (msg.mentions.users.size === 1) {
      let user = msg.mentions.users.first();
      if (user.id === bot.user.id) {
        msg.channel.send("Can't summon myself.");
        return;
      }

      let guildMember = msg.guild.members.fetch(user.id)
      .then(member => {
        let start = 12 + member.id.length;
        if (start >= msg.content.length) {
          msg.channel.send("Usage: !summon @user count");
          return;
        }

        let count = parseInt(msg.content.substring(start).trim());
        if (Number.isNaN(count)) {
          msg.channel.send("Usage: !summon @user count");
          return;
        }

        if (count > 30) {
          msg.channel.send("Max Summon Count is 30.");
          return;
        }

        for (let i = 0; i < count; i++) {
          msg.channel.send(user.toString());
        }
      });
    } else {
      msg.channel.send("Usage: !summon @user count")
    }
  } else if (msg.mentions.users.size === 1 && msg.mentions.users.first().id === bot.user.id && msg.author.id !== bot.user.id) {
    msg.channel.send("!rename " + msg.author.toString() + " fuckwhit");
  }
});