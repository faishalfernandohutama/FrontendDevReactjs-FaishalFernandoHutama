import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetchRestaurants',
    async (categoryFilter: string) => {
        let url = import.meta.env.API_URL;
        if (categoryFilter) {
            url += `?categories=${categoryFilter}`;
        }
        const response = await axios.get<Restaurant[]>(url);
        return response.data
    }
);

interface RestaurantState {
    data: Restaurant[];
    loading: boolean;
    error: string | null;
}

const initialState: RestaurantState = {
    data: [],
    loading: false,
    error:null,
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Terjadi kesalahan';
      });
  },
});

export default restaurantSlice.reducer;