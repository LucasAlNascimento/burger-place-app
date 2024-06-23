import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import menuReducer from './slice/Menu';
import basketReducer from './slice/Basket';
import searchReducer from './slice/Search';
import modalReducer from './slice/Modal';
import menuDetailReducer from './slice/MenuDetail';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['basket'],
};

const rootReducer = combineReducers({
  menu: menuReducer,
  basket: basketReducer,
  search: searchReducer,
  modal: modalReducer,
  menuDetail: menuDetailReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
