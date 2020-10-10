import { getAlbumDetailRequest } from "../../../api/request"
import * as actionTypes from './constants'

export const changeAlbumList = (data) =>({
  type:actionTypes.CHANGE_ALBUM_LIST,
  data:data
})

export const changeEndingLoading = (data) =>({
  type:actionTypes.CHANGE_ENDING_LOADING,
  data:data
})

export const getAlbumList = (id)=>{
  return (dispatch)=>{
    getAlbumDetailRequest(id).then(res =>{
      let data = res.playlist;
      dispatch(changeAlbumList(data))
      dispatch(changeEndingLoading(false))
    }).catch(err=>{
      console.log('获取歌单详情失败');
    })
  }
}