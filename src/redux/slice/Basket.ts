import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MenuItem } from '../../interfaces/Menu';
import { BasketState } from '../../interfaces/Basket';

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<MenuItem>) {
      state.items.push(action.payload);
      localStorage.setItem('basket', JSON.stringify(state));
    },
    removeItem(state, action: PayloadAction<number>) {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        localStorage.setItem('basket', JSON.stringify(state));
      }
    },
    clearBasket(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
