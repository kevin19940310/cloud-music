import React, { useEffect,useContext } from 'react';
import { connect } from "react-redux";
import LazyLoad, { forceCheck } from 'react-lazyload';
import * as actionTypes from './store/actionCreators';
import Horizon from '../../baseUI/Horizon'
import Scroll from '../../components/Scroll'
import {
  NavContainer,
  ListContainer,
  List,
  ListItem
} from './style'
import { categoryTypes, alphaTypes } from './data'

import {CHANGE_ALPHA,CHANGE_CATEGORY,CategoryDataContext} from './cacheData'



function Singers(props) {
  const {data,dispatch} = useContext(CategoryDataContext)
  const {category, alpha} = data

  let { singerList, pageCount, enterLoading, pullUpLoading, pullDownLoading } = props
  let { getHotSingerListDispatch, upDataSingersListDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props

  useEffect(() => {
    if(singerList.length<=0){
      getHotSingerListDispatch()
    }
  }, [])

  function typeAndArea(CategoryTypes) {
    if (CategoryTypes) {
      let data = CategoryTypes.split('0')
      return {
        type: data[data.length - 1],
        area: data[0] === '' ? 0 : data[0]
      }
    } else {
      return {
        type: '',
        area: ''
      }
    }
  }

  const handleCategoryTypes = (id) => {
    let { type, area } = typeAndArea(id)
    // setOldCategory(id)
    dispatch({type:CHANGE_CATEGORY,data:id})
    upDataSingersListDispatch(type, area, alpha)
  }

  const handleAlphaTypes = (id) => {
    let { type, area } = typeAndArea(category)
    dispatch({type:CHANGE_ALPHA,data:id})
    upDataSingersListDispatch(type, area, id)
  }

  function pullDown() {
    let { type, area } = typeAndArea(category)
    pullDownRefreshDispatch(type, area, alpha)
  }

  function pullUp() {
    let { type, area } = typeAndArea(category)
    pullUpRefreshDispatch(type, area, alpha, singerList.length)
  }

  function onScroll() {
  }


  return (
    <NavContainer>
      <Horizon title="分类:" list={categoryTypes} oldVal={category} handleClick={handleCategoryTypes}></Horizon>
      <Horizon title="首字母:" list={alphaTypes} oldVal={alpha} handleClick={handleAlphaTypes}></Horizon>
      <ListContainer>
        <Scroll onScroll={forceCheck} pullDown={pullDown} pullUp={pullUp} pullUpLoading={pullUpLoading} pullDownLoading={pullDownLoading} enterLoading={enterLoading}>
          <List>
            {
              singerList && singerList.map((item, index) => (
                <ListItem key={item.img1v1Id + '' + index}>
                  <div className="img_wrapper">
                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./loading.gif')} alt="music" />}>
                      <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                    </LazyLoad>
                  </div>
                  <span className="name">{item.name}</span>
                </ListItem>
              ))
            }
          </List>
        </Scroll>
      </ListContainer>
    </NavContainer>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.singers.singerList,
  pageCount: state.singers.pageCount,
  enterLoading: state.singers.enterLoading,
  pullUpLoading: state.singers.pullUpLoading,
  pullDownLoading: state.singers.pullDownLoading
})
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerListDispatch() {
      dispatch(actionTypes.getHotSingerList())
    },
    upDataSingersListDispatch(type, area, alpha) {
      dispatch(actionTypes.changePageCount(0))
      dispatch(actionTypes.changeEnterLoading(true))
      dispatch(actionTypes.getSingerList(type, area, alpha))
    },
    pullUpRefreshDispatch(type, area, alpha, count) {
      dispatch(actionTypes.changePullUpLoading(true))
      dispatch(actionTypes.changePageCount(count + 1))
      if (type || alpha) {
        dispatch(actionTypes.refreshMoreSingerList(type, area, alpha))
      } else {
        dispatch(actionTypes.refreshMoreHotSingerList())
      }
    },
    pullDownRefreshDispatch(type, area, alpha) {
      dispatch(actionTypes.changePullDownLoading(true))
      dispatch(actionTypes.changePageCount(0))
      dispatch(actionTypes.changeSingerList([]))
      if (type || alpha) {
        dispatch(actionTypes.getSingerList(type, area, alpha))
      } else {
        dispatch(actionTypes.getHotSingerList())
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));