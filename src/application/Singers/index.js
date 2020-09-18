import React,{useState} from 'react';
import Horizon from '../../baseUI/Horizon'
import {NavContainer} from './style'
import {categoryTypes,alphaTypes} from './data'


function Singers (props) {

  const [oldCategory,setOldCategory] = useState(null)
  const [oldAlpha,setAlpha] = useState(null)

  const handleCategoryTypes = (id)=>{
    setOldCategory(id)
  }

  const handleAlphaTypes = (id)=>{
    setAlpha(id)
  }

  return (
    <NavContainer>
      <Horizon title="分类:" list={categoryTypes} oldVal={oldCategory} handleClick={handleCategoryTypes}></Horizon>
      <Horizon title="首字母:" list={alphaTypes} oldVal={oldAlpha} handleClick={handleAlphaTypes}></Horizon>
    </NavContainer>
  )
}

export default React.memo (Singers);