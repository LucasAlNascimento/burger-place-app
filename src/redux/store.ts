import { configureStore, combineReducers } from "@reduxjs/toolkit";

import menuReducer from "./slice/Menu";
import basketReducer from "./slice/Basket";
import searchReducer from "./slice/Basket";

import { BasketState } from '../interfaces/Basket';


const rootReducer = combineReducers({
    menu: menuReducer,
    basket: basketReducer,
    search: searchReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        basket: loadBasketState(),
    },
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default function loadBasketState(): BasketState | undefined {
    try {
      const serializedState = localStorage.getItem('basket');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState) as BasketState;
    } catch (err) {
      return undefined;
    }
  }