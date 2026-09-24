import { createStore } from 'redux';
import type { Item } from '../Model/Item';

export type ReduxState = {
  items: Item[];
};
// 1. Initial state
const initialState = {
  items: [
    { id: 1, name: 'ReduxItem1', value: 10, date: new Date() },
    { id: 2, name: 'ReduxItem2', value: 20, date: new Date() },
    { id: 3, name: 'ReduxItem3', value: 30, date: new Date() },
  ],
};

// 2. Reducer (pure function)
function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case 'ASSIGN':
      return { items: action.payload };

    default:
      return state;
  }
}

// 3. Create store
const ReduxStore = createStore(itemsReducer);

export default ReduxStore;
export const selectItems = (state: ReduxState) => state.items;
