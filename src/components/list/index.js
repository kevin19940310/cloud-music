import React from 'react'
import { ListWrapper, List, ListItem } from './style'
import { getCount } from '../../util/utils'
import LazyLoad from "react-lazyload";


function RecommendList(props) {
  let { recommendList } = props
  return (
    <ListWrapper>
      <div className="title">推荐歌单</div>
      <List>
        {
          recommendList.map((item) => (
            <ListItem key={item.id}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                {/* 加此参数可以减小请求的图片资源大小 */}
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./loading.gif')} alt="music" />}>
                  <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          ))
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList)