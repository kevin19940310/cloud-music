import React from 'react';
import { renderRoutes } from "react-router-config";
import { NavLink } from 'react-router-dom';
import { Top,Tab,TabItem } from './style';

function Home (props) {
  const { route } = props;

  return (
    <>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">天天音乐</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink activeClassName="selected" to="/recommend">
          <TabItem><span>推荐</span></TabItem>
        </NavLink>
        <NavLink activeClassName="selected" to="/singers">
          <TabItem><span>歌手</span></TabItem>
        </NavLink>
        <NavLink activeClassName="selected" to="/rank">
          <TabItem><span>排行榜</span></TabItem>
        </NavLink>
      </Tab>

      { renderRoutes (route.routes) }
    </>
  )
}

export default React.memo(Home);