import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Menu } from "../../interfaces/menu";

export const fetchMenu = createAsyncThunk(
    'fetchMenu', 
    async () => {
    const response = await fetch('https://cdn-dev.preoday.com/challenge/menu');
    return response.json();
})

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        isLoading: false,
        data: null as Menu[] | null,
        isError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMenu.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMenu.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchMenu.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isError = true;
        })
    },
});

export default menuSlice.reducer;