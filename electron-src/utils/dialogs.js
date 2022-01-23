const { dialog, app, BrowserWindow } = require('electron');

function createAlertDialog(event, { title, message }, mainWindow) {
    message = message ? message : "alert"
    dialog.showMessageBoxSync(mainWindow, {
        title,
        type: "info",
        message
    })
}

function createErrorDialog(event, { title, message }, mainWindow) {
    message = message ? message : "Something went wrong"
    dialog.showMessageBoxSync(mainWindow, {
        title,
        type: "error",
        message
    })
}

function createSuccessDialog(event, { title, message }, mainWindow) {
    message = message ? message : "OK"
    dialog.showMessageBoxSync(mainWindow, {
        title,
        type: "success",
        message
    })
}

exports.createErrorDialog = createErrorDialog
exports.createAlertDialog = createAlertDialog
exports.createSuccessDialog = createSuccessDialog
