const Discord = require("discord.js");

const aws = require('aws-sdk');

const client = new Discord.Client();

client.on("ready", () => {
	
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity('Dev By Ta! (Tai)', { type: 'STREAMING' });
 
  var news = client.channels.get(process.env.general);
  lireFichierTexte();
  var regle  = "en recherche !";
  var bienvenu  = "en recherche !";
 
  news.send(process.env.dem); //message de demrrage
});


function lireFichierTexte()
{
	var fs = require("fs");
	
	var contenu;

	contenu = fs.readFileSync("reglement.txt", "UTF-8"); //message Reglement
	regle = contenu;
	
	var contenu2;

	contenu2 = fs.readFileSync("bienvenu.txt", "UTF-8");
	bienvenu = contenu2; //message welcome
	
	var contenu3;

	contenu3 = fs.readFileSync("help.txt", "UTF-8");
	helplist = contenu3; //help list
}

function replaceAll(find, replace, str) 
    {
      while( str.indexOf(find) > -1)
      {
        str = str.replace(find, replace);
      }
      return dem = str;
    }
client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === "✅" && user.id != "475317547483267072"){
        accueil.send("-69 " + user);
	let roleadd = message.guild.roles.find(r => r.name === "valide");
	if (!user.roles.has(roleadd)) {
		var news = client.channels.get(process.env.general);
		news.send("Merci " + toMute + " !");}
	}
    }
	if(reaction.emoji.name === "❎" && user.id != "475317547483267072") { // refuse le reglement
	
	accueil.send(regle).then(function (message) {
	message.react("✅");
    message.react("❎");
	
	});  
});

client.on('message', async message => {
	
	if(message.content.startsWith(process.env.prefix) + "69" && message.author.bot.id != "475317547483267072" && !message.member.roles.some(r=>["bot", "TestBot"].includes(r.name)) )return;
	
		let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
		if(!toMute) return message.channel.send("Merci d'entrer un utilisateur !");
		
		let role = message.guild.roles.find(r => r.name === "valide");
		
		if(message.content.startsWith("-69")){
			message.channel.bulkDelete(1);	
		await(toMute.addRole(role).catch(console.error));
		
		
}return;

	
  });

client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let user = member.user;
  let joinrole = guild.roles.find('name', 'mention');
  var accueil = client.channels.get(process.env.accueil);
  var salon = client.channels.get("401465181068328967");
  
  member.addRole(joinrole); //add role Mentionnables
  accueil.send("Bienvenue " + user + " " + bienvenu); //message de Bienvenue
  
  accueil.send(regle).then(function (message) {
	message.react("✅");
    message.react("❎");
	
	});
	
  console.log(user.username + " (" + user + ") joined " + guild.name + " (" + guild + ")");

});

client.on('message', message => {

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

var guild2 = message.member.guild;
let Mentionnables = guild2.roles.find('name', 'mention');

if(!message.content.startsWith(process.env.prefix)) return;

if (message.content.startsWith('mention') || message.content.startsWith(process.env.prefix + 'mention') ) {
  if (message.member.roles.has(Mentionnables)) {
	  message.member.removeRole(Mentionnables);
      message.channel.sendMessage('Vous n'+ "'" +'avez plus le r\u00f4le Mentionnables.');
      console.log(`${message.author.username} already has role`);
 }
  else {
	message.member.addRole(Mentionnables);
	message.channel.sendMessage('Vous avez maintenant le r\u00f4le Mentionnables.');
	console.log(`${message.author.username} got a role`);
};}});

client.on("message", async message => {
  if(message.author.bot) return;
  
  const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
	  
    const sayMessage = args.join(" ");
	
    message.delete().catch(O_o=>{}); 
	
    message.channel.send(sayMessage);
  }
  if(command === "hower"){
	message.channel.send("Hower un jeu cree par Ta! https://discord.gg/Cxc9ptU \u000A http://hower-game.is-great.net/");
  }
  if(command === "join"){
	message.channel.send("https://discord.gg/Cxc9ptU Viens Rejoindre Ma Communaute ");
  }
  if(command === "robot" || command === "bot"){
	message.channel.send("Je suis un robot Et je n'ai pas d'âme");
  }
  if(command === "sing"){
	message.channel.send("```The ting goes skrrrahh, pap, pap, ka-ka-ka Skidiki-pap-pap, and a pu-pu-pudrrrr-boom Skya, du-du-ku-ku-dun-dun Poom, poom, you dun know BOM BOM TAM TAM !!!!```");
  }
   
  if(command === "purge") {
	  
	  if(!message.member.roles.some(r=>["Simple dieu"].includes(r.name)) )
      return message.reply("Desoler, Vous n'avais pas les permissions pour faire ceci!");
	  
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 500)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  if(command === "reglement"){
	message.channel.send(regle).then(function (message) {
	message.react("✅");
    message.react("❎");
	
	});
  }
  
if(command === "help"){
	
    message.channel.send(helplist);

}
if(command === "restart"){
   message.channel.send('Restarting...')
    .then(msg => client.destroy())
    .then(() => client.login(process.env.token));
   }
if(command === "msg"){
	const msgn = String(args);
	process.env.dem = msgn;
	message.channel.send('It\'s saved!');
	
}
  else{
  
		var id = client.channels.get(process.env.diapo);
		
		var Attachment = (message.attachments).array();
	}
	
	Attachment.forEach(function(attachment) {
		
		if(attachment.message.channel.id !="460519199706578977" && attachment.message.channel.id != "435848474366312458" && attachment.message.channel.id != "401462327871799318" && attachment.message.channel.id != "401409106499338262" && attachment.message.channel.id != "422873170073354241" && attachment.message.channel.id != "421390954482630656" && attachment.message.channel.id != "436143655158284289" && attachment.message.channel.id != "405436787046219786"){
			id.send(attachment.url);
		}
		
	
	})
});

client.login(process.env.token);
