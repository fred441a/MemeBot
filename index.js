const express = require('express')
var iwlist = require("./iwlist");
var wpa = require("./wpaconnect");
var host = require("./Hostapd")
var dhcp = require("./dhcp")
const bp = require('body-parser')
var exec = require("child_process").exec;
fs = require('fs');
const app = express()
const port = 3000

var discord = require("./DiscordBot");
const { stdout } = require('process');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function nap() {
    await sleep(60000)

    exec("ping -c 1 google.com", async function (error, stdout, stderr) {
        if (error) {
            host.StartHotspot();
            await sleep(2000)
            dhcp.StartHotspot();
        } else {
            discord.SetupBot();
        }
    });
}
nap();



app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/config/index.html')
})

app.get('/WifiScan', (req, res) => {
    iwlist(function (error, result) {
        if (error) {
            console.error(error);
        } else {
            console.log(result[0].scan_results);
            res.send(result[0].scan_results);
        }

    });
})

app.post('/Setup', (req, res) => {
    let ENV = "DiscordBotKey = " + req.body.BotToken + " \nChannel = " + req.body.Channel;
    fs.writeFile(__dirname + "/.env", ENV, function (err) {
        if (err) {
            console.error(err);
        }
    });
    console.log(req.body);
    wpa.Connect(req.body.SSID, req.body.WifiPassword)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})