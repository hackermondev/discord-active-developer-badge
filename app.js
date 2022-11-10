const { createInterface } = require('node:readline');
const { Client, REST, Routes } = require('discord.js');

const client = new Client({ intents: [] });
const rl = createInterface({ input: process.stdin, output: process.stdout });


client.on('interactionCreate', (interaction) => {
  interaction.reply('yes');  
});

const question = (q) => new Promise((resolve) => rl.question(q, resolve));
(async ()=>{
  const token = await question('Application token? ');
  if(!token) throw new Error('Invalid token');

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