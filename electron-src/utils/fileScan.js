const homeDir = require('os').homedir();
const { dialog } = require('electron')
const fs = require('fs')
const path = require('path');
const { events } = require('../events/events.js');
const { processMediaFiles } = require('./processMediaFiles');

module.exports = {
    fileScan: function (event, { path: scanPath, type = "audio/mpeg" }, mainWindow) {
        if (!scanPath) scanPath = homeDir
        try {
            dialog.showOpenDialog(mainWindow, {
                defaultPath: scanPath,
                title: 'Open Dialogue',
                message: 'First Dialog',
                //pass 'openDirectory' to strictly open directories
                properties: ['openDirectory']
            }).then(result => {
                //   shell.openPath(result.filePaths[0])
                console.log(result);
                if (!result.canceled) {
                    result = result.filePaths[0]
                    result = path.resolve(result)
                    let files = fs.readdirSync(result, { withFileTypes: true })
                    console.log({ files }, "found")
                    files = files.map(item => {
                        item.fullPath = path.join(result, item.name)
                        return item
                    })
                    // files =
                    processMediaFiles(files).then((processedMediaFiles) => {
                        console.info(processedMediaFiles)
                        event.send(events.SCAN_DIR_RESULT, { files: processedMediaFiles, path: result })
                    })
                }
            })
        } catch (e) {
            console.error(e)
        }
    }
}