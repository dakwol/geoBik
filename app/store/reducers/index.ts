import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import dataPressReducer from './dataPressItem/dataPressItemReducer';
import SearchReducer from './searchPressItem/dataPressItemReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  dataPress: dataPressReducer,
  search: SearchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
