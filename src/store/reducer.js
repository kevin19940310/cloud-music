import { reducer as recommendReducer } from '../application/Recommend/store/index';
import {combineReducers} from 'redux'

export default combineReducers({
  recommend:recommendReducer
})