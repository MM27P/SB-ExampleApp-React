import { createContext } from 'react';
import type { Item } from './Model/Item';

type AppContextType = {
  localItems: Item[];
  selectedIndex: number;
  defaultNewChecked: boolean;
  edit: boolean;
  zustandChecked: boolean;
  reduxChecked: boolean;
  newItem: Item;
  formOpen: boolean;
  loadFileOpen: boolean;
  merge: boolean;
  synchronise: boolean;
  // methods
  setLocalItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setDefaultNewChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setZustandChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setReduxChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadFileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMerge: React.Dispatch<React.SetStateAction<boolean>>;
  setSynchronise: React.Dispatch<React.SetStateAction<boolean>>;

  add: (item: Item) => void;
  remove: (id: number) => void;
  select: (id: number) => void;
  addForm: (item: Item) => void;
  updateForm: (item: Item) => void;
};

// 2. Create context
export const AppContext = createContext<AppContextType | null>(null);
