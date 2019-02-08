const Discord = require('discord.js')
const Bot = new Discord.Client()

var token_login = "process.env.DISCORD_TOKEN"
var prefix = ":"

Bot.on('ready', () => {

console.log("Bot prêt");
});

Bot.on("message", async message => {

  if(command === prefix + "mute"){

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Vous n'avez pas les droits pour muter un utilisateur !");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Merci d'entrer un utilisateur !");
    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!role){
      try {
        role = await message.guild.createRole({
          name: "Muted",
          color:"#000000",
          permissions:[]
        });

        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack)
      }
    }

    if(toMute.roles.has(role.id)) return message.channel.send('L'utilisateur est déjà au goulag.');

    await(toMute.addRole(role));
    message.channel.send("Utilisateur muté.");

    return;
  }

});

Bot.login(token_login);
