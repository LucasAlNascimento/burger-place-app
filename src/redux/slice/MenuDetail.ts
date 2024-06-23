import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '../../interfaces/Menu';
import { MenuDetailState } from '../../interfaces/MenuDetail';

const initialState: MenuDetailState = {
  isOpen: false,
  selectedItem: null,
  selectedModifiers: {},
};

const menuDetailSlice = createSlice({
  name: 'menuDetail',
  initialState,
  reducers: {
    openMenuDetail(state, action: PayloadAction<MenuItem>) {
      state.isOpen = true;
      state.selectedItem = action.payload;
      if (action.payload.modifiers) {
        action.payload.modifiers.forEach((modifier) => {
          state.selectedModifiers[modifier.id] = modifier.items[0].id;
        });
      } else {
        state.selectedModifiers = {};
      }
    },
    closeMenuDetail(state) {
      state.isOpen = false;
      state.selectedItem = null;
    },
    selectModifierOption(state, action: PayloadAction<{ modifierId: number; optionId: number }>) {
      const { modifierId, optionId } = action.payload;
      state.selectedModifiers[modifierId] = optionId;
    },

  },
});

export const { openMenuDetail, closeMenuDetail, selectModifierOption } = menuDetailSlice.actions;

export default menuDetailSlice.reducer;
