import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singerReducer } from '../application/Singers/store/index'
import { reducer as rankReducer} from '../application/Rank/store/index'
import {reducer as albumReducer} from '../application/Album/store/index'
import { reducer as SingerDetailReducer} from '../application/SingerDetail/store/index'
import { combineReducers } from 'redux'

export default combineReducers({
  recommend: recommendReducer,
  singers: singerReducer,
  rank:rankReducer,
  album:albumReducer,
  singerInfo:SingerDetailReducer
})