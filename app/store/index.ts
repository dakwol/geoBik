import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './reducers';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export { RootState };

