var fs = require("fs");
var exec = require("child_process").exec;


module.exports = {
    Connect: Connect,
}

function Connect(SSID, PASSWORD, startbot) {
    var Wpa_config = "ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev \nupdate_config=1 \ncountry=GB \nnetwork={ \nssid=\"" + SSID + "\" \npsk=\"" + PASSWORD + "\" \nkey_mgmt=WPA-PSK \n}"
    fs.writeFile("/etc/wpa_supplicant/wpa_supplicant.conf", Wpa_config, function (err) {
        if (err) {
            console.error(err);
        }
    })
    exec("wpa_cli -i wlan0 reconfigure", function (err, stdout, stderr) {
        exec("sudo reboot");
    });

}