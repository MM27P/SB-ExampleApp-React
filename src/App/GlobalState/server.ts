export function mockFetch(): Promise<MockResponse<{ items: Item[] }>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        status: 200,
        json: async () => ({
          items: [
            { id: 1, name: 'RTKItem1-API', value: 10, date: new Date() },
            { id: 2, name: 'RTKItem2-API', value: 20, date: new Date() },
            { id: 3, name: 'RTKItem3-API', value: 30, date: new Date() },
          ],
        }),
      });
    }, 1000); // simulate network delay
  });
}
type MockResponse<T> = {
  ok: boolean;
  status: number;
  json: () => Promise<T>;
};
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Item } from '../Model/Item';
//it is working with import in middle

export const fetchItem = createAsyncThunk('items2/fetchItems', async () => {
  const response = await mockFetch();
  if (!response.ok) {
    throw new Error('Request failed');
  }

  const data = await response.json(); // ✅ unwrap it
  return data;
});
