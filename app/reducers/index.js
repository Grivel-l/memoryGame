import {combineReducers} from 'redux';

import game from './Game/game';
import redirect from './App/redirect';

export default combineReducers({
  game,
  redirect
});
