import { useContext } from 'react';
import { ListItem } from './ListItem';
import { AppContext } from '../../AppContext';

export function ListItemContainer() {
  const { localItems, select, selectedIndex } = useContext(AppContext);

  return (
    <ListItem
      ItemsActions={localItems.map((item, index) => ({
        item: item,
        select: () => select(index),
        selected: index === selectedIndex,
      }))}
    />
  );
}
