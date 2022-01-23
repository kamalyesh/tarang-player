
const mm = require('music-metadata');
// const util = require('util');
const { pathToFileURL } = require('url')
const path = require('path')


function serializeDate(dateObj) {
    return (new Date(dateObj)).toString()
}

function serializeMetadata(metaData) {
    if (metaData.format && metaData.format.creationTime) {
        metaData.format.creationTime = serializeDate(metaData.format.creationTime)
    }
    if (metaData.format && metaData.format.modificationTime) {
        metaData.format.modificationTime = serializeDate(metaData.format.modificationTime)
    }
    return metaData
}

function serializePlaylistItem(item) {
    if (item.metaData) {
        item.metaData = serializeMetadata(item.metaData)
    }
    return item;
}

async function _processMediaFile(file) {
    console.log("processing file", file.name)
    try {
        if (file.name.endsWith(".mp3")) {
            console.log("mp3 file", file.name)
            file.metaData = await mm.parseFile(file.fullPath, { duration: true })
            file = serializePlaylistItem(file)
            // return { ...file, metaData: JSON.parse(util.inspect(metaData, { showHidden: false, depth: 1 })) };
            return file;
        } else if (file.name.endsWith(".mp4")) {
            console.log("mp4 file", file.name)
            file.metaData = await mm.parseFile(file.fullPath, { duration: true })
            file = serializePlaylistItem(file)
            // return { ...file, metaData: JSON.parse(util.inspect(metaData, { showHidden: false, depth: 1 })) };
            return file;
        } {
            console.log("not mp3 or mp4 file", file.name)
            return file
        }
    } catch (e) {
        console.warn(e);
        return file
    }
}

module.exports = {
    processMediaFile: _processMediaFile,
    processMediaFiles: async function (files, mimeContainer = ['MPEG', 'MPEG-4', 'mp42/isom']) {
        return await Promise.all(files.map(file => _processMediaFile(file).catch(e => console.warn(e))))
            .then(result => result.filter(file => file && file.metaData && file.metaData.format && file.metaData.format.container &&
                // console.log(file.metaData.format.container)))
                mimeContainer.includes(file.metaData.format.container)))
            .then(result => result.map(item => {
                item.url = pathToFileURL(path.resolve(item.fullPath)).href
                return item;
            }))
            .catch(e => {
                console.warn(e);
                return []
            });
    }
}