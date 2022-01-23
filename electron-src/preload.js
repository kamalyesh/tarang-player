const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    // const replaceText = (selector, text) => {
    //     const element = document.getElementById(selector)
    //     if (element) element.innerText = text
    // }

    // for (const type of ['chrome', 'node', 'electron']) {
    //     replaceText(`${type}-version`, process.versions[type])
    // }
})

contextBridge.exposeInMainWorld("MyConfig", {
    name: "Tarang player",
    devloper: "Kamalyesh Kannadkar"
})
contextBridge.exposeInMainWorld(
    "api", {
    send: (channel, data) => {
        // whitelist channels
        // let validChannels = ["toMain"];
        // if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
        // }
    },
    receive: (channel, func) => {
        // let validChannels = ["fromMain"];
        // if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender` 
        ipcRenderer.on(channel, (event, ...args) => func(...args));
        // }
    },
    remove: (channel, func) => {
        // let validChannels = ["toMain"];
        // if (validChannels.includes(channel)) {
        ipcRenderer.removeListener(channel, func);
        // }
    },
    removeAll: (channel, func) => {
        // let validChannels = ["toMain"];
        // if (validChannels.includes(channel)) {
        ipcRenderer.remove(channel, func);
        // }
    }
});