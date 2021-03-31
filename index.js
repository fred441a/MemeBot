const express = require('express')
var wifi = require('node-wifi');
const bp = require('body-parser')
fs = require('fs');
const app = express()
const port = 3000

var discord = require("./DiscordBot");


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/config/index.html')
})

app.get('/WifiScan', (req, res) => {
    wifi.scan((error, network) => {
        if (error) {
            console.error(error);
        } else {
            res.send(network);
        }
    });
})

app.post('/Setup', (req, res) => {
    let ENV = "DiscordBotKey = "+req.body.BotToken+" \nChannel = "+req.body.Channel;
    fs.writeFile(__dirname+"/.env",ENV, function(err){
        if(err){
            console.error(err);
        }
    });
    console.log(req.body);
    wifi.connect({ ssid: req.body.SSID, password: req.body.WifiPassword }, error => {
        if (error) {
            console.log(error);
        }
        console.log('Connected');
    });
    discord.SetupBot();
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})