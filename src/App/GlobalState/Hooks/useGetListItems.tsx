import { useDispatch } from 'react-redux';
import { selectItems2, type AppDispatch, assign } from '../RTKState';
import { useCallback, useEffect, useState } from 'react';
import type { Item } from '../../Model/Item';
import { fetchItem } from '../server';
import { useZustandStore } from '../ZustandState';
import { useAppSelector } from '../Selectors';

export const useGetListItems = (
  zustandSelected: boolean,
  reduxSelected: boolean
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentItemList, setCurrentItemList] = useState<Item[]>([]);

  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);
  const zustandAssign = useZustandStore((state) => state.assign);
  const assignItems = useCallback(
    (items: Item[]) => {
      if (zustandSelected) {
        zustandAssign(items);
      } else if (reduxSelected) {
        dispatch(assign(items));
      }
    },
    [zustandSelected, reduxSelected]
  );

  const zustandItems = useZustandStore((state) => state.items);
  const reduxItems = useAppSelector(selectItems2);
  useEffect(() => {
    if (zustandSelected) {
      setCurrentItemList(zustandItems);
      return;
    }

    if (reduxSelected) {
      setCurrentItemList(reduxItems ?? []);
      return;
    }
  }, [zustandSelected, reduxSelected]);

  return {
    globalStateItems: currentItemList,
    assignItems,
  };
};
