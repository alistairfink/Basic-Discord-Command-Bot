require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;


const insultList = [
  "abortion",
  "ape covered in human flesh",
  "apefucker",
  "arse",
  "arsebreath",
  "arsecunt",
  "arseface",
  "arsehole",
  "arse-licker",
  "ass",
  "assaholic",
  "assbag",
  "assbutt",
  "ass clown",
  "asscunt",
  "assface",
  "assfag",
  "assfucker",
  "asshat",
  "asshole",
  "ass-kisser",
  "ass-licker",
  "assmonkey",
  "assmouth",
  "assmunch",
  "ass-nugget",
  "ass sucker",
  "asstard",
  "asswagon",
  "assweed",
  "asswipe",
  "aunt fucker",
  "badgerfucker",
  "bag of dicks",
  "bag whore",
  "ballkicker",
  "ballsack",
  "bastard",
  "bell-end",
  "birdbrain",
  "birdfucker",
  "bitch",
  "bitchass",
  "bitch ass motherfucker",
  "bitch boy",
  "bitchcunt",
  "bitchdicksucker",
  "bitchface",
  "bitchfucker",
  "bitchtits",
  "bitchwad",
  "bitchwhore",
  "bitchzilla",
  "bonehead",
  "boomer",
  "brickfucker",
  "brickhead",
  "buffoon",
  "bugfucker",
  "bugger",
  "bum-fucker",
  "burden",
  "buttass",
  "buttbreath",
  "buttfucker",
  "butthead",
  "butthole",
  "buttkisser",
  "buttlicker",
  "buttmunch",
  "butt sniffer",
  "cactus fucker",
  "camelfucker",
  "catfucker",
  "chickenfucker",
  "clitbag",
  "clithead",
  "cockfucker",
  "cockhead",
  "cockholster",
  "cockmaster",
  "cocksucker",
  "cockwaddle",
  "cockweasel",
  "cockwomble",
  "commie",
  "corpsefucker",
  "cousinfucker",
  "cowfucker",
  "crackhead",
  "crack whore",
  "craphole",
  "cumbucket",
  "cum dumpster",
  "cum guzzler",
  "cum-licker",
  "cumslut",
  "cumstain",
  "cunt",
  "cuntass",
  "cuntbiscuit",
  "cuntbitch",
  "cuntbreath",
  "cuntface",
  "cunt fart",
  "cuntfucker",
  "cuntlicker",
  "cunt muncher",
  "cunt rag",
  "cuntshit",
  "cuntsucker",
  "cuntzilla",
  "degenerate",
  "dickass",
  "dickbag",
  "dickbreath",
  "dickcheese",
  "dickface",
  "dickfucker",
  "dickhead",
  "dickhole",
  "dickless",
  "dicklicker",
  "dick sniffer",
  "dick-sucker",
  "dicktard",
  "dickwad",
  "dick weed",
  "dildo",
  "dimwit",
  "ding-head",
  "dingleberry",
  "dingus",
  "dipfuck",
  "dipshit",
  "dirtbag",
  "dirthead",
  "dirtwad",
  "dogbreath",
  "dogfucker",
  "donkey dick",
  "donkeyfucker",
  "douche",
  "douche bag",
  "doucheburger",
  "douche canoe",
  "douchefag",
  "douchelord",
  "douche nozzle",
  "douchewad",
  "douchewagon",
  "duckfucker",
  "dumbarse",
  "dumbass",
  "dumbo",
  "dum dum",
  "dummy",
  "faggotface",
  "fagtard",
  "fagtits",
  "failed abortion",
  "failure",
  "fartface",
  "fatass",
  "fatfuck",
  "fat geezer",
  "fatherfucker",
  "fatso",
  "fat-tard",
  "fatty",
  "fellow",
  "fetus",
  "fish fucker",
  "freak",
  "fuckass",
  "fuckbait",
  "fuckbucket",
  "fucker",
  "fuckface",
  "fuckhead",
  "fucking bitch",
  "fucklord",
  "fuck noggin",
  "fucknose",
  "fuck nugget",
  "fuckrod",
  "fuckshit",
  "fuckskull",
  "fuckstain",
  "fuckster",
  "fucktard",
  "fucktoy",
  "fuckweasel",
  "fuckwhistle",
  "fuckwit",
  "horsefucker",
  "idiot sandwich",
  "inbred",
  "jizz guzzler",
  "landwhale",
  "lobotomite",
  "megabitch",
  "megadouche",
  "mental midget",
  "moron",
  "motherfucker",
  "mousefucker",
  "mouth breather"];

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

    msg.channel.send("!rename " + msg.author.toString() + " " + insultList[Math.floor(Math.random() * insultList.length)]);
  }
});
