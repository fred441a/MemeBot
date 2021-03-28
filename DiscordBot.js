require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

var Electron = require("./ElectronHandle");

Electron.startWindow();

module.exports = {
    SetupBot: SetupBotfunc,
}


function SetupBotfunc() {


    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });


    client.on('message', message => {
        if (message.attachments.size != 0 && message.channel.name == process.env.Channel){
            message.attachments.forEach(attachment => {
                Electron.ChangeUrl(attachment.url);
            })
            console.log(message.channel.name);
        }
    })

    client.login(process.env.DiscordBotKey)
}