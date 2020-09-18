import React, { useEffect, useRef } from 'react';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
import Slider from '../../components/banner';
import RecommendList from '../../components/list';
import Scroll from '../../components/Scroll'
import { forceCheck } from 'react-lazyload';
import { Content } from './style'
import Loading from '../../baseUI/loading/index';

function Recommend(props) {

  const BSRef = useRef()

  const { bannerList, recommendList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if(!bannerList.length){
      getBannerDataDispatch();
      getRecommendListDataDispatch();
    }
  }, []);
  const bannerListJS = bannerList ? bannerList : [];
  const recommendListJS = recommendList ? recommendList : [];

  function pullDown() {
    console.log('下拉刷新');
  }

  function pullUp() {
    console.log('上拉到底了');
  }

  function onScroll() {
    // console.log('上拉滚动');
    forceCheck()
  }

  return (
    <Content>
      <Scroll ref={BSRef} pullDown={pullDown} pullUp={pullUp} onScroll={onScroll}>
        <div>
          {enterLoading ? <Loading></Loading> : null}
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  bannerList: state.recommend.bannerList,
  recommendList: state.recommend.recommendList,
  enterLoading: state.recommend.enterLoading
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  }
};

// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));