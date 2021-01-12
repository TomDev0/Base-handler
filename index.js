const { Client, Collection } = require("discord.js");
const { config } = require("dotenv"); //necesitamos la npm de dontev si no sabes como mira el archivo de la carptea handlers
const { token, default_prefix } = require("./config.json")
const client = new Client({
    disableEveryone: true
})


client.commands = new Collection();
client.aliases = new Collection();



["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`oye ${client.user.username} esta online!`);

    client.user.setPresence("EN beta") 
})

client.on("message", async message => {
   

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(default_prefix)) return;

    
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(default_prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
 
    let command = client.commands.get(cmd);

    if (!command) command = client.commands.get(client.aliases.get(cmd));

  
    if (command) 
        command.run(client, message, args);
});

client.login(token);
