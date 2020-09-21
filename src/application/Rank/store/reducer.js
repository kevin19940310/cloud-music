import * as actionTypes from './constants';
import produce from "immer"
let defaultState = {
  rankList:[],
  loading:true
}
const reducer = produce((draft,action) => {
  switch(action.type){
    case actionTypes.CHANGE_LOADING_END:
      draft.loading = action.data
      return draft
    case actionTypes.CHANGE_RANK_LIST:
      draft.rankList = action.data
      return draft
    default:
      return draft
  }
},defaultState)

export default reducer