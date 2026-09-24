import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fetchItem } from './server';
import type { Item } from '../Model/Item';

const itemsSlice = createSlice({
  name: 'item',
  initialState: {
    items: [
      { id: 1, name: 'RTKItem1', value: 10, date: new Date() },
      { id: 2, name: 'RTKItem2', value: 20, date: new Date() },
      { id: 3, name: 'RTKItem3', value: 30, date: new Date() },
    ], // 👈 array in the store
  },
  reducers: {
    assign: (state, action) => {
      state.items = action.payload;
    },
  },
});
interface StateItem {
  data: Item[];
  loading: boolean;
  error: string | null;
}
const initialState: StateItem = {
  data: [],
  loading: false,
  error: null,
};
const itemSlice2 = createSlice({
  name: 'item2',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.items;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { assign } = itemsSlice.actions;
export default itemsSlice.reducer;

export const RTKStore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    items2: itemSlice2.reducer,
  },
});

export const selectItems = (state: any) => state.items.items;
export const selectItems2 = (state: any) => state.items2.data;
export type AppDispatch = typeof RTKStore.dispatch;
