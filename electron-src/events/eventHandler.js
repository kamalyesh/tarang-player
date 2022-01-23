const { ipcMain } = require("electron");
const { createAlertDialog, createErrorDialog, createSuccessDialog } = require("../utils/dialogs");
const { fileScan } = require("../utils/fileScan");
const { events } = require("./events.js")

module.exports = {
    eventsListener: function (mainWindow) {
        // load ipc events
        ipcMain.on("LOAD_EVENTS", (event) => {
            console.log(events)
            event.sender.send("LOAD_EVENTS_RESULT", events)
        })
        // file system events
        ipcMain.on(events.SCAN_DIR, (event, args) => fileScan(event.sender, args, mainWindow))
        // alert events
        ipcMain.on(events.ALERT, (event, args) => createAlertDialog(event.sender, args, mainWindow))
        ipcMain.on(events.ERROR, (event, args) => createErrorDialog(event.sender, args, mainWindow))
        ipcMain.on(events.SUCCESS, (event, args) => createSuccessDialog(event.sender, args, mainWindow))
        console.log("listening for events")
    }
}