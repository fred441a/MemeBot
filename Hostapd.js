var exec = require("child_process").exec;

module.exports ={
    StartHotspot:function(){
        exec("sudo rfkill unblock wlan && sudo hostapd -B hostapd.conf && sudo ifconfig wlan0 192.168.0.1/24")
    }
}
