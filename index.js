const config = require("./config.json");
const Discord = require('discord.js');
const bot = new Discord.Client();
const moment = require("moment");
const prefix = config.prefix;

bot.on('ready', function() {
    console.log("je suis chaud")
})

bot.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let commands = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    if (commands === `${prefix}salut`) {
        return message.channel.send("salut tout le monde");
    }
});
bot.on("message", message => {
    if (message.content === (prefix + "membres")) {
        let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .addField("Membres du Serveur", message.guild.memberCount, true)
        message.channel.send(embed);
    }
})

bot.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLowerCase() === prefix + "purge") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":warning: Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
        message.channel.send(`${args[0]} message on ete supprimes :v:`)
    }
});
bot.on("message", message => {
if(message.content.startsWith(prefix + "strawpoll")) {
    let args = message.content.slice(prefix.length).trim().split(' ').join(" ")
    if(!args.slice(10)) return message.channel.send("Tu n'as pas présisé de texte")
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)
    .setDescription(args.slice(10))
    .setTimestamp()
    message.channel.send(embed).then(async (message) => {await message.react("✅");await message.react("❌")})
}
})

bot.on("message", message => {
    if(message.content.startsWith(prefix + "servinfo")) {
        console.log(message.author.tag + `" a fait la commande : servinfo "dans le serveur`+ message.guild.name)
        let embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name)
      .setFooter(`${message.guild.name}`)
      .setColor("dc143c")
      .setTitle("[PHOTO DU SERVEUR]")
      .addField("**:id: ID Du Serveur**", "**" + message.guild.id + "**", true)
      .addField("**:name_badge: Nom Du Serveur**", "**" + message.guild.name + "**", true)
      .addField("**:crown: Créateur Du Serveur**", "**" + message.guild.owner.user.tag + "**", true)
      .addField("**:crown: L'ID Du Créateur**", "**" + message.guild.ownerID + "**", true)
      .addField("**:earth_africa: Région**", "**" + message.guild.region + "**", true)
      .addField('**:speech_balloon: Channels**', `**${message.guild.channels.filter(m => m.type === 'text').size}**` + ' Channels Textuels | Channels Vocaux  ' + `**${message.guild.channels.filter(m => m.type === 'voice').size}**`, true)
      .addField("**:busts_in_silhouette: Membres**", "**" + message.guild.memberCount + "**", true)
      .addField("**:boy: Humains**", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
      .addField("**:robot: Nombres de bots**", "**" + message.guild.members.filter(m => m.user.bot).size + "**", true)
      .addField("**:date: Serveur Crée Le**", `**${message.guild.createdAt.toLocaleString()}**`, true)
      .addField("**:date: Serveur Rejoint Le**", "**" + message.member.joinedAt.toLocaleString() + "**")
      .addField("**:trophy: Rôles**", "**" + message.guild.roles.size + "**", true)
      .addField("**:lock: Sécurité**", `**Niveau de sécurité : ${message.guild.verificationLevel}**`)
      .setFooter('© Western')
      .setTimestamp()
      message.channel.send(embed);
      }
      }
      
        )
        bot.on('message', message => {
            if(message.content.startsWith(prefix + "ping" )) {
                    message.channel.send(new Date().getTime() - message.createdTimestamp + "ms");        
            }
        })
        
        bot.on('message',message =>{
            if (!message.guild) return
            let args = message.content.trim().split(/ +/g)
        
        if (args[0].toLowerCase() === prefix + 'ban'){
            if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("**Vous n'avez pas la permission d'executer cette commande !**")
            let member = message.mentions.members.first()
            if (!member) return message.channel.send('**Veuillez mentionner un utilisateur :(**')
            if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send('**Vous ne pouvez pas ban cette personnes !!**')
            if (!member.bannable) return message.channel.send('**je ne peut pas ban cet utilisateur ! **')
            message.guild.ban(member, {days: 7})
            message.channel.send(member.user.username + ' à bien été banni du serveur !');
            
            }
        
        });
        bot.on('message', message => {
            if(message.content.startsWith(prefix + "kick" )) {
              const member = message.mentions.members.first()
              
              if (!member) {
                return message.reply('Il faut que vous mentionnez une personne 😅')
              }
              if (!member.kickable) {
                return message.reply('Je ne peut pas kick ce membre,desoler🤔')
              }
              return member
                .kick()
                .then(() => message.reply(' l utilisateur a été kick avec succes'))
                .catch(error => message.reply("Une erreur s'est produite"))
            }
          })
          //invite
          bot.on('message', message => {
            if(message.content.startsWith(prefix + "invite" )) {
        message.reply("**:robot: Yo :v: ,Voici mon lien d'invitation :tada:https://discordapp.com/oauth2/authorize?client_id=590856059447410688&scope=bot&permissions=8 :tada:")
        }
 })

//serveur support
bot.on('message', message => {
    if(message.content.startsWith(prefix + "support" )) {
        message.reply("**:robot: Salut :grin: , Voici mon serveur :tada: support :tada: Viens pour plus d aide et des suggestions :wink: https://discord.gg/3uBdmps**")
 }
});        
bot.on('message', message => {
    if(message.content.startsWith(prefix + "serveurs" )) {
        console.log(message.author.tag + `" a fait la commande : serveurs "dans le serveur`+ message.guild.name)
    let embed = new Discord.RichEmbed()
    .setColor("#1a819b")
    .setTitle("Je suis sur " + bot.guilds.size + " serveurs" )
    .setDescription(bot.guilds.map(c => c.name))
    .setFooter("© Western  | 2019 "+ bot.users.size + " utilisateurs")
    .setTimestamp()
    message.channel.send(embed)
 }
})
bot.on('message', message => {
    if(message.content.startsWith(prefix + 'calin')) { 
        message.delete()
        let user = message.guild.member(message.mentions.users.first());
        var facts = ["https://cdn.discordapp.com/attachments/576038287303507978/576045960468234270/tenor_gif786099605.gif",
    "https://cdn.discordapp.com/attachments/576038287303507978/576046075610398721/tenor_gif2097919235.gif",
    "https://cdn.discordapp.com/attachments/576038287303507978/576046234284851229/tenor_gif1409569625.gif",
    "https://cdn.discordapp.com/attachments/576038287303507978/576046457661161472/tenor_gif-145660273.gif ",
    "https://cdn.discordapp.com/attachments/576038287303507978/576046544164487198/tenor_gif-2084372537.gif",
    "https://cdn.discordapp.com/attachments/576038287303507978/576046708518158355/tenor_gif-461437040.gif",
    "https://cdn.discordapp.com/attachments/576038287303507978/576046640054534144/tenor_gif-1531899666.gif",
    "https://cdn.discordapp.com/attachments/576038287303507978/576046811744305163/tenor_gif289693878.gif",
    "https://cdn.discordapp.com/attachments/576038287303507978/576047026052005901/tenor_gif-1132435972.gif",
    "https://cdn.discordapp.com/attachments/576038287303507978/576047160718786610/tenor_gif1218076412.gif",
    "https://cdn.weeb.sh/images/BkBs2uk_b.gif",
    "https://cdn.weeb.sh/images/rk_6GyncG.gif",
    "https://cdn.weeb.sh/images/ry6o__7D-.gif",
    "https://cdn.weeb.sh/images/Sk2gmRZZG.gif", 
    "https://cdn.weeb.sh/images/BkZngAYtb.gif", 
    "https://cdn.weeb.sh/images/ByuHsvu8z.gif", 
    "https://cdn.weeb.sh/images/Hk3ox0tYW.gif", 
    "https://cdn.weeb.sh/images/BkHA_O7v-.gif",   
    "https://cdn.weeb.sh/images/S1gUsu_Qw-.gif"];
        var fact = Math.floor(Math.random() * facts.length);
        var hugembed2 = new Discord.RichEmbed()
        .setTitle(`${bot.user.username} fais un calin a ${message.author.username} `)
        .setColor('RANDOM')
        .setImage(facts[fact])
        if(!user) return message.channel.send(hugembed2)
        var hugembed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} fais un calin a ${user.user.username} `)
        .setColor('#ffffff')
        .setImage(facts[fact])
        .setFooter('Western 2019')
        .setTimestamp()
        if(user) { return message.channel.send(hugembed) } else console.log("Une erreur a été commise !")
        }
    })   

    bot.on('message', message => {
    if (message.content.startsWith(prefix + 'pub')){
    return message.channel.send("```voici la pub du serveur : Bienvenue dans MultiSupport ! Caractéristique du serveur : 📌Ajouter ton bot, tester ton bot et aussi ceux des autres, donner tes avis ou des conseils ! 🔍Discutez, rigolez et te faire plein d'amis ! 🔭Des salons uniques, et varié ! 📣Des giveways et événements pour rendre le serveur encore plus amusant ! 🎖Des nouveautés rêgulièrement pour animé le serveur ! Voici l'entrée vers notre univers multisupport :[https://discord.gg/3uBdmps]Nous tattendons impatiemment !```");
}
})
bot.on('message', message => {
    if(message.content.startsWith(prefix + 'salut')){
    return message.channel.send("**salut a vous jeunes membres**")
    }
    })

bot.on('message', message => {
if(message.content.startsWith(prefix + 'qui est le plus beau')){
return message.channel.send("** Mon propriétaire est le plus beau**")
}
})

bot.on('message',function(message){
    if(message.content.includes(prefix +'deconnexion')){
      if(!message.member.hasPermission("ADMINISTRATOR")) { return message.channel.send(':Warning: "**tu n\'as pas la permission jeune personnage**')}
      if(message.author.id !== "449295211265392641") {
        message.reply("Tu n'est pas mon créateur")}
      message.channel.send('**Western déconnécté :sad: **')
      message.delete().then(bot.destroy())
    }
  })
bot.on('guildMemberAdd', member =>{
member.guild.channels.get('605690341240340480').send('**:tada: bienvenue sur le serveur**' + member.user + '**:smile: Nous sommes **' + member.guild.memberCount);
console.log('+1')
})

bot.on('guildMemberRemove', member =>{
    member.guild.channels.get('605690341240340480').send('**:cry: aurevoir **' + member.user + '**:cry: Nous sommes **' + member.guild.memberCount);
    console.log('-1')
})
bot.on('message', message => {
    if(message.content.startsWith(prefix + 'reboot')) {
       let embed = new Discord.RichEmbed()
   
       if(message.author.id !== "449295211265392641")  return;
       bot.destroy()
       bot.login(config.token)
   embed.setTitle("Western redémmaré avec succés !")
   .setFooter(message.author.username, message.author.avatarURL)
   .setTimestamp()
   .setColor("BLUE");
   message.channel.send(embed)
console.log('un utilisateur a demandé le reboot')   
}
   })
bot.on('message', message => {
    if(message.content.startsWith(prefix + 'avatar')) {

   let member = message.mentions.members.first();

    if (member) {
        let avatarembed1 = new Discord.RichEmbed()
            .setTitle(`voici ton avatar **${member.user.username}**`)
            .setDescription(`_ l'avatar ne s'affiche pas ?_ **> [clique ici](${member.user.avatarURL}) <**`)
            .setImage(member.user.avatarURL)
            .setTimestamp();
        message.channel.send(avatarembed1)
    }
    if (!member) {

        let avatarembed2 = new Discord.RichEmbed()
            .setTitle(`voici ton avatar **${message.author.username}**`)
            .setDescription(`_l'avatar ne s'affiche pas ?_ **> [clique ici](${message.author.avatarURL}) <**`)
            .setImage(message.author.avatarURL)
            .setTimestamp();
        message.channel.send(avatarembed2)
    }
}
})

bot.on('message', message => {
    if(message.content.startsWith(prefix + "info")) {
    var embed = new Discord.RichEmbed()
    embed.setThumbnail(bot.user.avatarURL)    
    embed.setColor("#FF0066")
        embed.setTitle("Voici les informations sur le serveur !")
        embed.addField("Nom :", `${bot.user.tag}`, true)
        embed.addField("Descriminateur du bot", `#${bot.user.discriminator}`)
        embed.addField("ID :", `${bot.user.id}`)
        embed.addField("Nombre de membres", message.guild.members.size)
        embed.addField("Nombre de catégories et de salons", message.guild.channels.size)
        embed.setFooter("© Western 2019")
        embed.setTimestamp()
        message.channel.send(embed);
    console.log(message.author.tag + `" a fait la commande : info " dans le serveur `+ message.guild.name)
}
})
    bot.on('message', message =>{
        if(message.content.startsWith(prefix + 'aide')){
                   console.log(message.author.tag + `" a fait la commande : aide " dans le serveur `+ message.guild.name)
            let help = new Discord.RichEmbed()
           .setColor('#328c97')
            .setDescription(`**voici ma page d'aide <@${message.author.id}>**`)
           .addField("**bot:**", " **`pub`, `invite`, `support`**")
           .addField("**moderation:**", " **`kick`, `ban`, `purge`,`report`,`anti-insultes`,**")
           .addField("**image:**", " **`avatar`, `calin`,**")
           .addField('**fun:**', "**`8ball`, `say`,`embed`**")
           .addField('**utile:**', "**`ìs`, `membres`, `servinfo`, `ìnfo`, `strawpoll`, `ping`, `infos`,`infomembre`, `serveurs`**")
           .addField('**réserver au créateur uniquement**',"** `déconnexion`, `reboot`, `activité`,**")
           .addField('**inviter Western**',"** https://discordapp.com/oauth2/authorize?client_id=590856059447410688&scope=bot&permissions=8**")
           .addField('**serveur support du bot**',"** https://discord.gg/3uBdmps **")
           .addField('créateur du bot', "**<@449295211265392641> aidé par : <@535151998199136282>, <@565554050192506917>, <@588798614499885079>, <@500707692252364810>, **")
           .setThumbnail(bot.user.avatarURL)
          .setFooter('™ Western 2019')
       .setTimestamp();
           message.channel.send(help)
       }  
       })

bot.on('message', message => {
    if(!message.guild) return;
    let args = message.content.trim().split(/ +/g)
    
    if (args[0].toLocaleLowerCase()=== prefix + "8ball"){
        if(!args[1]) return message.channel.send("❌ **Vous n'avez pas poser de question.**")
        let rep = ["oui","Bien sûr !","Comme tu veux.","Non","Pourquoi cette question ?","Je répond pas à cette question."]
        let reptaille = Math.floor((Math.random()* rep.length));
        let question = args.join(" ").slice(6);
        
        let embed = new Discord.RichEmbed()
              .setAuthor(message.author.tag)
              .setColor("FF7F50")
              .addField("Question : ", question)
              .addField("Réponse : ", rep[reptaille]);
          message.channel.send(embed);
        }
     })
     bot.on('message', message =>{
        if(message.content.startsWith(prefix +"report")) {
            message.delete
            let argsmp = message.content.split(" ").slice(1).join(" ");
            let embed = new Discord.RichEmbed()
       .setAuthor(message.guild.name)
       .setFooter(`${message.guild.name}`)
       .setColor("#FF4202")
       .setURL(`${message.guild.iconURL}`)
       .addField([message.author.tag] + " voici la raison et le membre du report dans le serveur "+ message.guild.name ,argsmp,true)
       bot.users.get("449295211265392641").send(embed);
};
     })
     bot.on('message', message =>{
     if (message.content.startsWith(prefix + "infos")) {
        console.log(message.author.tag + `" a fait la commande : infos "dans le serveur `+ message.guild.name)
        if(!message.member.hasPermission("ADMINISTRATOR")) {
             return message.channel.send("**" +  message.author.username + " Tu n'a pas les Permissions**")} 
    if (message.channel.type === "dm") return;
     let user; 
     if (message.mentions.users.first()) { 
         user = message.mentions.users.first(); }
          else { user = message.author; }
           const member = message.guild.member(user); 
         embed = new Discord.RichEmbed() 
             .setColor('d8c088') 
             .setTitle(`${user.username}#${user.discriminator}`)
              .addField('**ID:**', `${user.id}`, true)
               .addField('**Surnom:**', `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
                .addField('**Cree le:**', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                 .addField('**Serveur join le:**', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                  .addField('**Status:**', `${user.presence.status}`, true) 
                  .addField('**Jeux:**', `${user.presence.game ? user.presence.game.name : 'None'}`, true) 
                  .addField('**Roles:**', member.roles.map(roles => `${roles.name}`).join(', '), true)
                     .setThumbnail(bot.user.avatarURL)
          .setFooter("Western", bot.user.avatarURL)
          .setTimestamp()
                   message.channel.send({embed});
                   
                  
     }
})
bot.on('message', message =>{
if (message.content.startsWith(config.prefix + "is")) {
    console.log(message.author.tag + `" a fait la commande : is "dans le serveur `+ message.guild.name)
    if (message.channel.type === "dm") return;
    let infoEmbed = new Discord.RichEmbed()
      .setAuthor("Informations du Serveur.")
      .setColor("d8c088")
      .addField('**Nom** : ', message.guild.name)
      .addField('**ID** : ', message.guild.id)
      .addField('**Localisation** : ', message.guild.region)
      .addField('**Date de creation** : ', message.guild.createdAt)
      .addField('**Createur** : ', message.guild.owner.user.tag) 
      .addField('**Roles** : ', message.guild.roles.size)
      .addField('**Nombre de membres** : ', message.guild.memberCount)
      .addField('**Salons** : ', message.guild.channels.size)
        .setThumbnail(bot.user.avatarURL)
          .setFooter("Western ", bot.user.avatarURL)
      .setTimestamp()
    message.channel.send(infoEmbed);
  }
})
  bot.on('message', message =>{
  if(message.content.startsWith(prefix + "infomembre")) {
    let sicon = message.guild.iconURL;
    console.log(message.author.tag + `" a fait la commande : infomembre "dans le serveur `+ message.guild.name)
       var dnd = message.guild.members.filter(e => e.presence.status === "dnd").size
   var online = message.guild.members.filter(e => e.presence.status === "online").size
   var offline = message.guild.members.filter(e => e.presence.status === "offline").size
   var idle = message.guild.members.filter(e => e.presence.status === "idle").size
   var human = message.guild.members.filter(member => !member.user.bot).size;
   var bot = message.guild.members.filter(member => member.user.bot).size
   
   let membrembed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL) 
    .setTitle("Stats Membres")
     .setColor("000000")
    .addField("Membres : ", `__${message.guild.members.size}__`)
   .addField("Humains :",`__${human}__`) 
   .addField("Bots", `__${bot}__`) 
   .addField("Connecté : ", `__${online} __`) 
   .addField("Déconnecté : ", `__${offline} __`) 
   .addField("Ne pas derangé : ", `__${dnd} __`) 
   .addField("Absent : ", `__${idle} __`) 
   .setFooter("Western") 
      .setTimestamp();
   message.channel.send(membrembed);
  }
   })
  bot.on('message', message =>{ 
   if(message.content.startsWith(prefix + "say")) {
message.channel.send(message.content.substring(5));
message.delete()
   }
})
bot.on('message', message =>{
    if(message.content.startsWith(prefix + 'embed')) {
                 if (message.deletable) message.delete();
                var coucouzer = message.content.split(" ").slice(1)
                if(!coucouzer[0]) return;
                 {
                    var embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}`, message.author.avatarURL)
                    .setColor("Random")
                    .setDescription(coucouzer.join(" "))
                    .setTimestamp()
                    message.channel.send(embed)
                }
            }
        })
        bot.on('message', message =>{
            if(message.content.startsWith(prefix + 'test')){
                message.reply('que veux tu tester', `<@${message.author.id}>` )
            }
        }) 
        bot.on('message', message =>{
        if(message.content.startsWith("fdp") || message.content.startsWith("Fdp") || message.content.startsWith("batard") || message.content.startsWith("`baise ta soeur`") || message.content.startsWith("ntm") || message.content.startsWith("salope") || message.content.startsWith("F D P") || message.content.startsWith("nique ta mère") || message.content.startsWith("nique tes morts") || message.content.startsWith('fils de pute')) {
         message.delete();
     let embed = new Discord.RichEmbed()
      .setColor("#FF4202")
      .setTitle(`${message.author.username}, merci de ne pas dire d'insultes.`)
      message.channel.send(embed)
        }
    })
    bot.on('message', message =>{
        if(message.content.startsWith(prefix + "activité")) {
            let argsactivity = message.content.split(" ").slice(1).join(" ");
            if(message.author.id !== "449295211265392641") {
            message.reply("Tu n'est pas mon créateur")}
            bot.user.setActivity(`${argsactivity}`, {type : "STREAMING"})
            message.reply("Je joue maintenant a " + argsactivity) 
            }
        })
    
    bot.login(process.env.BOT_token);
