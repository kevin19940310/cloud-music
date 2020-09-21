import {CHANGE_LOADING_END,CHANGE_RANK_LIST} from './constants'
import {getRankListRequest} from '../../../api/request'


export const changeRankList = (data) => ({
  type:CHANGE_RANK_LIST,
  data:data
})

export const changeEndLoading = (data) =>({
  type:CHANGE_LOADING_END,
  data:data
})


export const getRankList = () => {
  return (dispatch) => {
    getRankListRequest().then(res=> {
      let data = res.list
      dispatch(changeEndLoading(false))
      dispatch(changeRankList(data))
    }).catch(err => {
      console.log('获取排行榜失败');
    })
  }
}