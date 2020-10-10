import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style'
import SongsList from '../SongList'
import Header from "../../baseUI/header/index";
import Scroll from '../../components/Scroll'
import Loading from "./../../baseUI/loading/index";
import { CSSTransition } from 'react-transition-group'
import { HEADER_HEIGHT } from "./../../api/config";
import { connect } from 'react-redux';
import { getSingerInfo, changeEnterLoading } from "./store/action";

function SingerDetail(props) {
  const { 
    artist, 
    songs, 
    loading,
  } = props;
  const { getSingerDataDispatch } = props;
  const id = props.match.params.id;
  let [showStatus, setShowStatus] = useState(true)
  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();
  // 图片初始高度
  const initialHeight = useRef(0);

  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
    const id = props.match.params.id;
    getSingerDataDispatch (id);
    let h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
    //eslint-disable-next-line
  }, []);

  const handleScroll = useCallback(pos => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    const percent = Math.abs(newY / height);
    if (newY > 0 && layerDOM) {
      //处理往下拉的情况,效果：图片放大，按钮跟着偏移
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY && layerDOM) {
      //往上滑动，但是还没超过Header部分
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY && layerDOM) {
      //往上滑动，但是超过Header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      //防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      //此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  })

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExit={() => props.history.goBack()}
    >
      <Container>
        <Header
          handleClick={setShowStatusFalse}
          title={artist.name}
          ref={header}
        ></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll onScroll={handleScroll} ref={songScroll}>
            <SongsList
              songs={songs}
              showCollect={false}
            ></SongsList>
          </Scroll>
        </SongListWrapper>

      { loading ? (<Loading></Loading>) : null}
      </Container>
    </CSSTransition>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
  artist: state.singerInfo.artist,
  songs: state.singerInfo.songsOfArtist,
  loading: state.singerInfo.loading,
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    getSingerDataDispatch (id) {
      dispatch (changeEnterLoading (true));
      dispatch (getSingerInfo (id));
    }
  };
};

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps,mapDispatchToProps)(React.memo (SingerDetail));