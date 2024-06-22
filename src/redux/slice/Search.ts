import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '../../interfaces/Search';

const initialState: SearchState = {
    term: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.term = action.payload;
        },
    },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
