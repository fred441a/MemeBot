var exec = require("child_process").exec;

module.exports ={
    StartHotspot:function(){
        exec("sudo udhcpd dhcpcd.conf")
    }
}