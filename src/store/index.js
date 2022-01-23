import { configureStore } from '@reduxjs/toolkit'
import playlistSlice from "../components/playlist/playlistSlice"

export default configureStore({
    reducer: {
        playlistSlice
    },
})