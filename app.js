const { createInterface } = require('node:readline');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const { Client, Routes } = require('discord.js');
//Pre-built AND changeable command
var ping = {
  name: 'ping',
  description: 'yes'
}
//Command Example
var command2 = {
  name:'command2',
  description:'yes'
}

const commands = [ping, command2]; //Add your commands with commas to add them to the bot!
//Feel free to ask for help! I (Arch1010#4338) would love to help! Or ping me in hackermon's discord! https://discord.gg/M5MSE9CvNM

const client = new Client({ intents: [] });
const rl = createInterface({ input: process.stdin, output: process.stdout });


client.on('interactionCreate', (interaction) => { //This is when the / command is used!
  //This 'if'/'else if'/'else' statement allows you to add commands!
  if (interaction.commandName === 'ping') { //commandName is auto generator by the interaction! Please change the text inside 
    //to a command that you are using. 
  interaction.reply('yes');  
  } else if(interaction.commandName === 'command2') { //This is the example command's name!
    interaction.reply("Example Command!");
  } else { //A response if you forget to add the command here!
    interaction.reply("This command's respone hasnt been added yet!");
  }
});

const question = (q) => new Promise((resolve) => rl.question(q, resolve));
(async ()=>{
  const token = await question('Application token? ');
  if(!token) throw new Error('Invalid token');

  const ratelimitTest = await fetch(`https://discord.com/api/v9/invites/discord-developers`);

  if(!ratelimitTest.ok) {
    await question(`Uh oh, looks like the node you're on is currently being blocked by Discord. Press the "Enter" button on your keyboard to be reassigned to a new node. (you'll need to rerun the program once you reconnect)`)

    // This kills the container manager on the repl forcing Replit to assign the repl to another node with another IP address (if the ip is globally rate limited)
    //^ in short: Restarts the bot to be used again/attempted to start up again!
    execSync('kill 1');
    return;
  };
  
  await client.login(token).catch((err) => {
    throw err
  });

  await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands }); //commands added to the variable will auto update!

  console.log('DONE | Application/Bot is up and running. DO NOT CLOSE THIS TAB UNLESS YOU ARE FINISHED USING THE BOT, IT WILL PUT THE BOT OFFLINE.');
  //Do NOT disregard this message. Doing the opposite WILL turn the bot off and unresponsive to /commands!
})();
