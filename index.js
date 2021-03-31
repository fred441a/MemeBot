var hostapd = require('wireless-tools/hostapd');
var wpa_cli = require('wireless-tools/wpa_cli');
var udhcpd = require('wireless-tools/udhcpd');
var wpa_supplicant = require('wireless-tools/wpa_supplicant');

const express = require('express')
const bp = require('body-parser')
fs = require('fs');
const app = express()
const port = 3000



var discord = require("./DiscordBot");


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/config/index.html')
})

app.get('/WifiScan', (req, res) => {

    wpa_cli.scan('wlan0', function(err, data){
        wpa_cli.scan_results('wlan0', function(err, data) {
           // returns the results of the BSS scan once it completes
           console.log(data);
           res.send(data)
        })
    });

});

app.post('/Setup', (req, res) => {
    let ENV = "DiscordBotKey = "+req.body.BotToken+" \nChannel = "+req.body.Channel;
    fs.writeFile(__dirname+"/.env",ENV, function(err){
        if(err){
            console.error(err);
        }
    });
    console.log(req.body);
    var options = {
        interface: 'wlan0',
        ssid: req.body.SSID,
        passphrase: req.body.WifiPassword,
        driver: 'wext'
      };
       
      wpa_supplicant.enable(options, function(err) {
          console.log("Connected!")
          discord.SetupBot();
      });


})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function StartHotspot(){

    var options = {
        channel: 6,
        driver: 'rtl871xdrv',
        hw_mode: 'g',
        interface: 'wlan0',
        ssid: 'MemeFrame',
        wpa: 2,
        wpa_passphrase: 'MemeFrame'
      };
       
      hostapd.enable(options, function(err) {
        // the access point was created
      });

    var options = {
        interface: 'wlan0',
        start: '192.168.10.100',
        end: '192.168.10.200',
        option: {
          router: '192.168.10.1',
          subnet: '255.255.255.0',
          dns: [ '4.4.4.4', '8.8.8.8' ]
        }
      };
       
      udhcpd.enable(options, function(err) {
        // the dhcp server was started
      });
}

function StopHotspot(){

    hostapd.disable('wlan0', function(err) {
        // no longer hosting the access point
      });

      udhcpd.disable('wlan0', function(err) {
        // the dhcp server was stopped
      });
}