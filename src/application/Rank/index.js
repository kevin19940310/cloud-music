import React, { useEffect } from 'react';
import * as actionTypes from './store/action';
import { connect } from 'react-redux'
import { Container, ListItem, List, SongList } from './style'
import Scroll from '../../components/Scroll'
import { filterIndex } from '../../util/utils'
import Loading from '../../baseUI/loading'
import LazyLoad, { forceCheck } from 'react-lazyload';


function Rank(props) {

  let { rankList, loading } = props
  let { getRankListDispatch } = props

  useEffect(() => {
    getRankListDispatch()
  }, [])

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? {"display":"none"}:  {"display": ""};

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item,index) => {
            return (
              <ListItem key={item.coverImgId+''+index} tracks={item.tracks}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./loading.gif')} alt="music" />}>
                      <img src={`${item.coverImgUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                    </LazyLoad>
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                { renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }


  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }

  return (
    <Container>
      <Scroll onScroll={forceCheck}>
        <div>
          <h1 className="offical" style={displayStyle}> 官方榜 </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}> 全球榜 </h1>
          {renderRankList(globalList, true)}
          {loading ? <Loading></Loading> : null}
        </div>
      </Scroll>
      {/* {renderRoutes (props.route.routes)} */}
    </Container>
  )
}

const mapStateToProps = (state) => ({
  rankList: state.rank.rankList,
  loading: state.rank.loading
})

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDispatch() {
      dispatch(actionTypes.getRankList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))