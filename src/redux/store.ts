import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import menuReducer from './slice/menu';
import basketReducer from './slice/basket';
import searchReducer from './slice/search';
import modalReducer from './slice/modal';
import menuDetailReducer from './slice/menu-detail';

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
