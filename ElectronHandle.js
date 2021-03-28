const {app, BrowserWindow} = require('electron');
const path = require('path');
const { electron } = require('process');
let winid;
let win;

module.exports = {
    startWindow: function () {

        app.whenReady().then(() => {
            createWindow()

            app.on('activate', () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    createWindow()
                }
            })
        })

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        })

    },
    ChangeUrl: function(Url){
        console.log(winid);
        win.loadURL(Url);
    },

};

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
    })

    win.loadURL('https://fred441a.github.io/404')
    winid = win.id;
}
