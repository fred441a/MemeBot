var exec = require("child_process").exec;
exec("ping -c 1 google.com", function (error, stdout, stderr){
    console.log(stdout);
});