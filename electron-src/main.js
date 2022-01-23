const { app, BrowserWindow, ipcMain, Menu, MenuItem, protocol, contextBridge } = require('electron')
const path = require('path')
const { eventsListener } = require('./events/eventHandler')
const isDev = require('electron-is-dev')
const { createAlertDialog } = require('./utils/dialogs')

function attachContextMenu(win) {
    try {
        var rightClickPosition = null
        const menu = new Menu();
        const menuItem = new MenuItem({
            label: "Inspect Element",
            click: () => win.webContents.inspectElement(rightClickPosition)
        })
        menu.append(menuItem);
        const openMenu = (e) => {
            e.preventDefault();
            rightClickPosition = { x: e.x, y: e.y };
            menu.popup(win)
        }
        win.addEventListener('contextMenu', openMenu)
        win.on('contextMenu', openMenu)

    } catch (error) {
        console.error(error)
    }
}

function createWindow() {

    const config = {}

    if (app.isPackaged || !isDev) {
        config.preload = path.join(__dirname, '../main/native_modules/preload.js')
        config.path = path.resolve(__dirname, "../renderer/main_window/index.html")
    } else {
        config.preload = path.join(__dirname, 'preload.js')
        config.path = path.resolve(__dirname, "../public/index.html")
        // config.url = "http://localhost:3000/"
    }


    const webPreferences = {
        nodeIntegration: true,
        contextIsolation: true,
        enableRemoteModule: false,
        webSecurity: false, // very important 
    }

    if (config.preload) webPreferences.preload = config.preload

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences,
        title: app.getName()
    })

    if (config.path) win.loadFile(config.path)
    else if (config.url) win.loadURL(config.url)

    win.webContents.openDevTools();
    eventsListener(win)
    // createAlertDialog(null, { title: "Tarang", message: "App is ready" }, win)
}

app.whenReady().then(() => {
    createWindow()
    protocol.registerFileProtocol('file', (request, callback) => {

    })
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