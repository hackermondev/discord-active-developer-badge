const { createInterface } = require('node:readline');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const { Client, Routes } = require('discord.js');

const ping = {
  name: 'ping',
  description: 'Pings the bot and shows the latency'
};


// Command Example
const command2 = {
  name:'command2',
  description:'yes'
}

const commands = [ping, command2]; // Add your commands with commas to add them to the bot!
// Join the Discord for support: https://discord.gg/M5MSE9CvNM

const client = new Client({ intents: [] });
const rl = createInterface({ input: process.stdin, output: process.stdout });


client.on('interactionCreate', (interaction) => {
  if (interaction.commandName === 'ping') {
    interaction.reply(`Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);  
  } else if(interaction.commandName === 'command2') { // This is the example command's name!
    interaction.reply('example command');
  } else { // a response if you forget to add the command here
    interaction.reply('this command\'s response has not been added yet!');
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

  await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands });

  console.log('DONE | Application/Bot is up and running. DO NOT CLOSE THIS TAB UNLESS YOU ARE FINISHED USING THE BOT, IT WILL PUT THE BOT OFFLINE.');


  // Skysilk Sponsorship (feel free to remove this if you're editing the code)
  console.log(`\n\n`);
  const chalk = require('chalk');
  require('console-png').attachTo(console);

  
  console.log(chalk.bold('Sponsored by', chalk.hex('#5A96F6')('SkySilk')));
  console.log(`The #1 VPS hosting solution for Discord bots, website, and more.\nChoose from dozens of Linux apps & clean OS installs to deploy in seconds with just 1-click. Whether you're running a small cloud operation or part of an enterprise-level organization, SkySilk offers over 40 resource plans to ensure you have the right cloud VPS environment suitable for your projects.`);
  console.log(`----> ${chalk.green.bold(`https://bit.ly/SkysilkBotHosting`)} <----\n`);
  console.png(require('path').join(__dirname, 'assets', 'skysilk-logo-icon.png'))
})();
