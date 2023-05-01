const { createInterface } = require('node:readline');
const { Client, Routes } = require('discord.js');
const commandNames = ['ping', 'command2', 'command3', 'command4'];

const client = new Client({ intents: [] });
const rl = createInterface({ input: process.stdin, output: process.stdout });

const question = (q) => new Promise((resolve) => rl.question(q, resolve));
(async ()=>{
  const token = await question('Application token? ');

  await client.login(token);
  const commands = await client.rest.get(Routes.applicationCommands(client.user.id));

  const toBeRemoved = commands.filter((c) => commandNames.includes(c.name));

  console.log('removing', toBeRemoved);
  for (let i = 0; i < toBeRemoved.length; i++) {
    const command = toBeRemoved[i];
    await client.rest.delete(`/applications/${client.user.id}/commands/${command.id}`);

    console.log('removed', command.id, command.name);
  };

  console.log('done');
  process.exit();
})();
