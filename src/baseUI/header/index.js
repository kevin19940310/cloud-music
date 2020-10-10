import React from 'react'
import propTypes from 'prop-types'
import { HeaderContainer, Marquee } from './style'

const Header = React.forwardRef((props, ref) => {
  const { title, handleClick, isMarquee } = props

  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
      {
        isMarquee?<Marquee><h1 className="text">{title}</h1></Marquee> : <h1>{title}</h1>
      }
    </HeaderContainer>
  )
})

Header.defaultProps = {
  title: '标题',
  handelClick: () => { },
  isMarquee: false
}

Header.propTypes = {
  title: propTypes.string,
  handelClick: propTypes.func,
  isMarquee: propTypes.bool
}

export default React.memo(Header)