import React, { useRef, useEffect, useImperativeHandle, useState, forwardRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import { debounce } from '../../util/utils' 
import styled from 'styled-components';
import Loading from '../../baseUI/loading/index';
import Loading2 from '../../baseUI/loading-v2/index';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState();
  const scrollContainerRef = useRef();
  const { direction, click, refresh, bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll } = props;
  const { pullUpLoading, pullDownLoading, enterLoading } = props

  let pullUpDebounce = useMemo (() => {
    return debounce (pullUp, 600)
  }, [pullUp]);

  let pullDownDebounce = useMemo (() => {
    return debounce (pullDown, 600)
  }, [pullDown]);

  useEffect(() => {
    setTimeout(() => {
      const scroll = new BScroll(scrollContainerRef.current, {
        scrollX: direction === "horizontal",
        scrollY: direction === "vertical",
        probeType: 3,
        click: click,
        bounce:{
          top: bounceTop,
          bottom: bounceBottom
        }
      });
      setBScroll(scroll);
    }, 500);
    return () => {
      setBScroll(null);
    }
    // eslint-disable-next-line
  }, []);


  // 每次重新加载 刷新实例
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 监听上拉加载
  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
  }, [bScroll, onScroll])

  // 判断上拉到底
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    }
  }, [pullUp,pullUpDebounce, bScroll]);

  // 用户下拉刷新
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce()
      }
    });
    return () => {
      bScroll.off('touchEnd');
    }
  }, [pullDown,pullDownDebounce, bScroll]);


  // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  const PullUpDisplayStyle = pullUpLoading || enterLoading ? { display: "" } : { display: "none" };
  const PullDownDisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <div style={PullUpDisplayStyle}><Loading></Loading></div>
      {/* 顶部下拉刷新动画 */}
      <div style={PullDownDisplayStyle}><Loading2></Loading2></div>
    </ScrollContainer>
  );
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll