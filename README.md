# Active Developer Badge
Discord just launched the new "Active Developer" badge and they're encouraging new developers to join the community and get it.
If you're still learning and want the badge, follow the instructions below!




--------------------------------------

![image](https://i.imgur.com/z6jzw4C.png)

--------------------------------------



# Instructions

- Go to https://discord.com/developers/applications, and create a new application on the account you want the badge on
- Go to the bot tab and generate a bot account for the application
- Click the "Reset Token" button to generate a token (if you have 2fa enabled, you'll need your code)
- Copy the token to your clipboard
- Click this badge to clone this repo to a new repl in Replit -> [![Run on Repl.it](https://replit.com/badge/github/hackermondev/discord-active-developer)](https://replit.com/new/github/hackermondev/discord-active-developer)
  - You will be redirected to Replit, you might have to create an account (you can Register with Google)
- Wait for the repo has finished cloning and the repl to full connect
- Click the green "Run" button at the top
- Go to the console (big black square on the right) and paste in the token you copied earlier (**Note**: ``CTRL + V`` won't work, you'll need to do ``CTRL + Shift + V`` or right-click and click paste
- Wait for it to print 'DONE' in the console, **DON'T STOP THE PROGRAM OR CLOSE THE TAB YET**
- Go back to the application page, go to the "General Information" tab, scroll down and copy application id
- Create a new discord server (you can delete it at the end)
- Use this invite link to add the application to the server: (replace ``{applicationid}`` with what you copied) ``https://discord.com/oauth2/authorize?client_id={applicationid}&scope=bot%20applications.commands&permissions=105227086912``
- In the server, go to a channel and use the ``/ping`` command on the bot
- Go to the <https://discord.com/developers/active-developer> page and register everything (**if it says you're not eligbile, it's because you're not registered in their system yet. you might have to wait up to 24 hours**)
- Congrats on that shiny new badge 


If you're encounting any issues, [create a new GitHub issue](https://github.com/hackermondev/discord-active-developer/issues)
