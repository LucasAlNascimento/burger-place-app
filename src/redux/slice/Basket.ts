// redux/slice/Basket.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketState, BasketItem } from '../../interfaces/Basket';
import { Modifier } from '../../interfaces/Menu';

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<BasketItem>) {
      const newItem = action.payload;

      const existingItemIndex = state.items.findIndex(item => {
        if (item.id !== newItem.id) return false;
        if (item.modifiers?.length !== newItem.modifiers?.length) return false;
        if (item.modifiers && newItem.modifiers) {
          for (let i = 0; i < item.modifiers.length; i++) {
            const existingModifier = item.modifiers[i];
            const newModifier = newItem.modifiers.find(mod => mod.id === existingModifier.id);

            if (!newModifier || existingModifier.selectedOptionId !== newModifier.selectedOptionId) {
              return false;
            }
          }
        }

        return true;
      });

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }

      localStorage.setItem('basket', JSON.stringify(state));
    },
    removeItem(state, action: PayloadAction<{ id: number; modifiers?: Modifier[] }>) {
      const { id, modifiers } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === id && JSON.stringify(item.modifiers) === JSON.stringify(modifiers)
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }

      localStorage.setItem('basket', JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem } = basketSlice.actions;
export default basketSlice.reducer;
