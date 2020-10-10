import * as actionTypes from './constants';
import produce from "immer"

const defaultState = {
  currentAlbum: {},
  enterLoading: false,
}

const reducer = produce((draft,action)=>{
  switch(action.type){
    case actionTypes.CHANGE_ALBUM_LIST:
      draft.currentAlbum = action.data
      return draft
    case actionTypes.CHANGE_ENDING_LOADING:
      draft.enterLoading = action.data
      return draft
    default:
      return draft
  }
},defaultState)

export default reducer