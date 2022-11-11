const { createInterface } = require('node:readline');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const { Client, REST, Routes, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [] });
const rl = createInterface({ input: process.stdin, output: process.stdout });


client.on('interactionCreate', (interaction) => {
  interaction.reply('yes');  
});

const question = (q) => new Promise((resolve) => rl.question(q, resolve));
(async ()=>{
  const token = await question('Application token? ');
  if(!token) throw new Error('Invalid token');

  const ratelimitTest = await fetch(`https://discord.com/api/v9/invites/discord-developers`);

  if(!ratelimitTest.ok) {
    await question(`Uh oh, looks like the node you're on is currently being blocked by Discord. Press the "Enter" button on your keyboard to be reassigned to a new node. (you'll need to rerun the program once you reconnect)`)

    // This kills the container manager on the repl forcing Replit to assign the repl to another node with another IP address (if the ip is globally rate limited)
    execSync('kill 1');
    return;
  };
  
  await client.login(token).catch((err) => {
    throw err
  });

  const rest = new REST({ version: '10' }).setToken(token);
  await rest.put(Routes.applicationCommands(client.user.id), { body: [
    {
      name: 'ping',
      description: 'yes'
    }
  ] });

  console.log('DONE');
})();
