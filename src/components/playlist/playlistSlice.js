import { createSlice } from '@reduxjs/toolkit'

function playListItem() {
  return {
    name: '',
    fullPath: '',
    url: '',
    totalDuration: 0,
    duraionPlayed: 0,
  }
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlist: [],
    nowPlaying: playListItem()
  },
  reducers: {
    setNowPlayingByIndex: (state, action) => {
      // action.payload is index
      state.nowPlaying = { ...state.playlist[action.payload] }
      // fetch("file:///" + state.playlist[action.payload].url).then(file => {
      //   console.log({file})
      //   state.nowPlaying = file.body
      // }).catch(e => e)
    },
    insertOne: (state, action) => {
      // action.payload is item
      var item = playListItem()
      item.name = action.payload.name
      item.fullPath = action.payload.fullPath
      item.url = action.payload.url
      state.playlist.push(item)
    },
    insertMany: (state, action) => {
      // action.payload is array of items
      state.playlist.push(...action.payload.map((_item) => {
        var item = playListItem()
        item.name = _item.name
        item.fullPath = _item.fullPath
        item.url = _item.url
        return item;
      }))
    },
    removeOne: (state, action) => {
      // action.payload is index
      if (action.payload > -1 && action.payload <= state.playlist.length) {
        state.playlist.splice(action.payload, 1)
      }
    },
    removeMany: (state, action) => {
      // action.payload is array of indices
      action.payload.sort(function (a, b) { return b - a; });
      state.playlist = state.playlist.filter((item, index) => !action.payload.includes(index))
    }
  },
})

// Action creators are generated for each case reducer function
export const { insertOne, insertMany, removeOne, removeMany, setNowPlayingByIndex } = playlistSlice.actions

export default playlistSlice.reducer