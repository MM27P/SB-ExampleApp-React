import { useState } from 'react';
import type { Item } from '../Model/Item';

export const useItemList = (items: Item[] = []) => {
  const [localItems, setLocalItems] = useState<Item[]>(items);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const add = (item: Item) => {
    const copy = [...localItems, item];
    setLocalItems(copy);
  };

  const update = (item: Item) => {
    localItems[selectedIndex] = item;
  };

  const remove = (id: number) => {
    const newList = localItems.filter((_, i) => i !== id);
    setLocalItems(newList);
    setSelectedIndex(selectedIndex - 1);
  };

  return {
    localItems,
    setLocalItems,
    add,
    update,
    remove,
    selectedIndex,
    setSelectedIndex,
  };
};
