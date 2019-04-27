const Discord = require("discord.js");

const aws = require('aws-sdk');

const client = new Discord.Client();

client.on("ready", () => {
	
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
 
	client.user.setActivity('Dev By Ta! (Tai)' + process.env.prefix + 'help', { type: 'STREAMING' });
 
 
	var news = client.channels.get(process.env.general);
 
	lireFichierTexte();
  
	var regle  = "en recherche !";
 
	var bienvenu  = "en recherche !";
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

client.on('message', message => {

	if (message.author.bot) return;
 
	if (message.channel.type === 'dm') return;


	var guild2 = message.member.guild;

	let Mentionnables = guild2.roles.find('name', 'mention');

	if(!message.content.startsWith(process.env.prefix)) return;


	if (message.content.startsWith(process.env.prefix + 'mention') ) {
 
		if (message.member.roles.has(Mentionnables.id)) {
	 
			message.member.removeRole(Mentionnables);
    
			message.channel.sendMessage('Vous n'+ "'" +'avez plus le r\u00f4le Mentionnables.');
     
			console.log(`${message.author.username} already has role`);
 
		}
 
		else {
	
			message.member.addRole(Mentionnables);
	
			message.channel.sendMessage('Vous avez maintenant le r\u00f4le Mentionnables.');
	
			console.log(`${message.author.username} got a role`);

		}
	}
});

client.on('message', message => {

	if (message.author.bot) return;
 
	if (message.channel.type === 'dm') return;


	var guild2 = message.member.guild;

	let rolev = guild2.roles.find('name', 'valide');

	if(!message.content.startsWith(process.env.prefix)) return;


	if (message.content.startsWith(process.env.prefix + 'ok') ) {
 
		if (message.member.roles.has(rolev.id)) {
			
			message.channel.sendMessage('STOP 1 FOIS SEULEMENT !');
 
		}
 
		else {
	
			message.member.addRole(rolev);
	
			message.reply('Merci a toi !');
	
			console.log(`${message.author.username} got a role`);

		}
	}
});

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
	
		message.channel.send("Hower un jeu cree par Ta! https://discord.me/dovioo \u000A http://hower-game.is-great.net/");

	}
  
	if(command === "pacman"){
	
		message.channel.send("PacMan un jeu cree par Ta! https://discord.me/dovioo \u000A http://re.22web.org/?k=rz84");

	}
	
	if(command === "join"){
	
		message.channel.send("https://discord.me/dovioo Viens Rejoindre Ma Communaute ");
 
	}
 
	if(command === "robot" || command === "bot"){
	
		message.channel.send("Je suis un robot Et je n'ai pas d'âme");
 
	}
  
	if(command === "sing"){
	
		message.channel.send(process.env.sing);
 
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
	
});

	client.login(process.env.token);
