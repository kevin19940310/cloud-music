import React, { createContext, useReducer } from 'react';
import produce from "immer"

export const CategoryDataContext = createContext({});

// 相当于之前的 constants
export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';

//reducer 纯函数
const reducer = produce((draftState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      draftState.category = action.data
      return draftState
    case CHANGE_ALPHA:
      draftState.alpha = action.data
      return draftState
    default:
      return draftState
  }
});


export const Data = (props) => {
  const [data, dispatch] = useReducer(reducer, () => ({
    category: '',
    alpha: ''
  }));

  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      {
        props.children
      }
    </CategoryDataContext.Provider>
  )
}