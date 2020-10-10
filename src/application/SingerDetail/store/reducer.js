import * as actionTypes from './constants';
import produce from "immer"

const defaultState = {
  artist: {},
  songsOfArtist: [],
  loading: true
};

const reducer = produce((draft,action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      draft.artist = action.data
      return draft
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      draft.songsOfArtist = action.data
      return draft
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.loading = action.data
      return draft
    default:
      return draft;
  }
},defaultState)

export default reducer