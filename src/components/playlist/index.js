import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { insertMany, insertOne, removeMany, removeOne, setNowPlayingByIndex } from "./playlistSlice"
// import { remote } from 'electron';

export function Playlist() {
    const dispatch = useDispatch()
    const { playlist } = useSelector(state => state.playlistSlice)
    const [scanPath, setScanPath] = useState("")
    // const [removeIndex, setRemoveIndex] = useState(-1)
    // const [removeIndices, setRemoveIndices] = useState("")
    const ipcEvents = window.ipcEvents;

    const openDialog = async () => {
        window.api.send(ipcEvents.SCAN_DIR, { path: scanPath })
        new Promise((resolve, reject) => {
            const eventHandler = (args) => {
                window.api.remove(ipcEvents.SCAN_DIR_RESULT, eventHandler)
                console.log(args)
                if (args) {
                    resolve(args)
                } else {
                    window.api.send(ipcEvents.ALERT, { title: "Alert", message: "Please select files" })
                    resolve()
                }
            }
            window.api.receive(ipcEvents.SCAN_DIR_RESULT, eventHandler)
        }).then(result => {
            if (result) {
                dispatch(insertMany(result.files))
            }
            else console.log("no files")
        })
    }

    // const addNewSong = () => {
    //     if (playlist && playlist.length) {
    //         dispatch(insertOne({ item: playlist.length + 1 }))
    //     } else dispatch(insertOne({ item: 1 }))
    // }
    // const addTenSongs = () => {
    //     for (let index = 0; index < 10; index++) {
    //         dispatch(insertOne({ item: playlist.length + 1 + index }))
    //     }
    // }
    // const removeSong = () => {
    //     dispatch(removeOne(removeIndex - 1))
    // }
    // const removeSongs = () => {
    //     dispatch(removeMany(removeIndices.split(",").map(i => Number(i.trim()) - 1)))
    // }

    return (<ul>
        <li key="playlist-title">Playlist</li>
        <li key="playlist-controls">
            <button onClick={openDialog}>scan</button>
            {/* <button onClick={addNewSong}>add {playlist.length + 1}'th song</button>
            <button onClick={addTenSongs}>add 10 songs</button>
            <div><input type="number" value={removeIndex} onInput={(e) => setRemoveIndex(e.target.value)} /><button onClick={removeSong}>remove {removeIndex}th song</button></div>
            <div><input type="text" placeholder="comma separated numbers" value={removeIndices} onInput={(e) => setRemoveIndices(e.target.value)} /><button onClick={removeSongs}>remove {removeIndices} songs</button></div> */}
        </li>
        {
            playlist.map((item, index) => <li key={`playlist-item-${index + 1}`}>{JSON.stringify(item.name)}<button onClick={() => dispatch(setNowPlayingByIndex(index))}>play</button></li>)
        }
        <li key="playlist-meta">Total {playlist.length} songs</li>
    </ul>)
}