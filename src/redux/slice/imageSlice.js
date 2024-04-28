import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 12;
// const key = "uFzG2LdOW2mLKarhZwW3u0qYaV5prZqTx8uY0K-NeVg";
const key = "7IuKlxrOqXsmEjfimKdjIwUTuJSU207GceeQE-qwGVc";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ query, page }, { rejectWithValue }) => {
    console.log("query", query, page);
    try {
      const response = await axios.get(
        `${API_URL}?query=${query}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${key}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  entities: {
    results: [],
    total: 0,
    total_pages: 0,
  },
  loading: "idle",
  error: null,
};

const imageSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Synchronous reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const { page } = action.meta.arg;
        if (page === 1) {
          // If it's the first page, replace the existing data
          state.entities = action.payload;
        } else {
          // If it's not the first page, append the results to the existing data
          state.entities.results = [
            ...state.entities.results,
            ...action.payload.results,
          ];
          state.entities.total = action.payload.total;
          state.entities.total_pages = action.payload.total_pages;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload; // Handle and display this error appropriately in your UI
      });
  },
});
export default imageSlice.reducer;
