import * as actionTypes from './constants';
import produce from "immer"

const defaultState = {
  bannerList: [],
  recommendList: [],
  enterLoading:true
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      draft.bannerList = action.data
      return draft
    case actionTypes.CHANGE_RECOMMEND_LIST:
        draft.recommendList= action.data 
      return draft
    case actionTypes.CHANGE_ENTER_LOADING:
        draft.enterLoading = action.data
        return draft
    default:
      return draft
  }
},defaultState)

export default reducer