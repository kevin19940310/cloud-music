import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singerReducer } from '../application/Singers/store/index'
import { reducer as rankReducer} from '../application/Rank/store/index'
import { combineReducers } from 'redux'

export default combineReducers({
  recommend: recommendReducer,
  singers: singerReducer,
  rank:rankReducer
})