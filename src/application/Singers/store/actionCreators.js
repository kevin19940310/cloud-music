import * as actionsTypes from './constants'
import { getHotSingerListRequest, getSingerListRequest } from '../../../api/request';



export const changeSingerList = (data) => ({
  type: actionsTypes.CHANGE_SINGER_LIST,
  data: data
})

export const changePageCount = (data) => ({
  type: actionsTypes.CHANGE_PAGE_COUNT,
  data: data
})

export const changeEnterLoading = (data) => ({
  type: actionsTypes.CHANGE_ENTER_LOADING,
  data: data
})

export const changePullUpLoading = (data) => ({
  type: actionsTypes.CHANGE_PULL_UP_LOADING,
  data: data
})

export const changePullDownLoading = (data) => ({
  type: actionsTypes.CHANGE_PULLDOWN_LOADING,
  data: data
})

export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then(res => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(err => {
      console.log('拉取热门歌手列表失败');
    })
  }
}

export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().singers.pageCount
    const singerList = getState().singers.singerList

    getHotSingerListRequest(pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(err => {
      console.log('拉取更多热门歌手列表失败');
    })
  }
}

export const getSingerList = (type,area,alpha) => {
  return (dispatch) => {
    getSingerListRequest(type,area,alpha,0).then(res => {
      const data = res.artists;
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(err => {
      console.log('拉取歌手列表失败');
    })
  }
}

export const refreshMoreSingerList = (type,area,alpha) => {
  return (dispatch,getState) => {
    const pageCount = getState().singers.pageCount
    const singerList = getState().singers.singerList
    getSingerListRequest(type,area,alpha,pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(err => {
      console.log('拉取更多歌手列表失败');
    })
  }
}