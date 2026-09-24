import { create } from 'zustand';
import type { Item } from '../Model/Item';

type ItemStore = {
  items: Item[];
  assign: (newItems: Item[]) => void;
};
const ZustandItems = [
  { id: 1, name: 'ZustandItem1', value: 10, date: new Date() },
  { id: 2, name: 'ZustandItem2', value: 20, date: new Date() },
  { id: 3, name: 'ZustandItem3', value: 30, date: new Date() },
];
export const useZustandStore = create<ItemStore>()((set) => ({
  items: ZustandItems,
  assign: (newItems: Item[]) => set((_state) => ({ items: newItems })),
}));
