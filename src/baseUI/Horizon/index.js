import React, { useEffect, useRef } from 'react'
import Scroll from '../../components/Scroll'
import { PropTypes } from 'prop-types';
import { List, ListItem } from './style'

function Horizon(props) {
  const HorizonRef = useRef(null)
  // 首先考虑接受的参数
  //list 为接受的列表数据
  //oldVal 为当前的 item 值
  //title 为列表左边的标题
  //handleClick 为点击不同的 item 执行的方法
  const { list, oldVal, title, handleClick } = props

  // 加入初始化内容宽度的逻辑
  useEffect(() => {
    let categoryDOM = HorizonRef.current;
    let tagElem = categoryDOM.querySelectorAll("span");
    let totalWidth = 10;
    Array.from(tagElem).forEach(ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction={"horizontal"}>
      <div ref={HorizonRef}>
        <List>
          <span>{title}</span>
          {
            list.map((item) => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick(item.key)}>
                  {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

Horizon.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
};

Horizon.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

export default React.memo(Horizon)