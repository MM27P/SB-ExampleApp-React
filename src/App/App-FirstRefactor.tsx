import { useEffect, useState } from 'react';

import './App.css';
import type { Item } from './Model/Item';
import { useZustandStore } from './GlobalState/ZustandState';
import { useAppSelector } from './GlobalState/Selectors';
import { selectItems2 } from './GlobalState/RTKState';
import { ListItem } from './Components/ListItems/ListItem';
import { ButtonPanel } from './Components/ButtonPanel/ButtonPanel';
import { downloadJSON, loadFromLocalStorage, saveToLocalStorage } from './Utils/BrowserUtils';
import { ItemForm } from './Components/ItemForm/ItemForm';
import { FileLoader } from './Components/FileLoader/FileLoader';
import { SettingsPanel } from './Components/Settings/SettingsPanel';
import { Timer } from './Components/Timer/Timer';
import { Achievments } from './Components/Achievments';

function App({ items }: { items: Item[] }) {
  const [localItems, setLocalItems] = useState<Item[]>(items);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [defaultNewChecked, setDefaultNewChecked] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [zustandChecked, setZustandChecked] = useState<boolean>(false);
  const [reduxChecked, setReduxChecked] = useState<boolean>(false);
  const newItem = { id: 0, name: 'new', value: 69, date: new Date() };
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [loadFileOpen, setLoadFileOpen] = useState<boolean>(false);

  const zustandItems = useZustandStore((state) => state.items);

  const reduxItems = useAppSelector(selectItems2);
  useEffect(() => {
    if (zustandChecked) {
      setLocalItems(zustandItems);
      return;
    }

    if (reduxChecked) {
      setLocalItems(reduxItems ?? []);
      return;
    }
  }, [zustandChecked, reduxChecked]);
  const add = (item: Item) => {
    const copy = [...localItems, item];
    setLocalItems(copy);
  };

  const addForm = (item: Item) => {
    add(item);
    setFormOpen(false);
  };

  const updateForm = (item: Item) => {
    localItems[selectedIndex] = item;
    setFormOpen(false);
    setEdit(false);
  };
  const remove = (id: number) => {
    const newList = localItems.filter((_, i) => i !== id);
    setLocalItems(newList);
    setSelectedIndex(selectedIndex - 1);
  };

  const select = (index: number) => {
    if (!edit) {
      setSelectedIndex(index);
    }
  };

  return (
    <>
      <h1>LIST IN REACT</h1>
      <ListItem
        ItemsActions={localItems.map((item, index) => ({
          item: item,
          select: () => select(index),
          selected: index === selectedIndex,
        }))}
      />
      {!formOpen && (
        <ButtonPanel
          Buttons={[
            {
              Label: 'Add',
              Action: () =>
                defaultNewChecked ? add(newItem) : setFormOpen(true),
            },
            {
              Label: 'Edit',
              Action: () => {
                setFormOpen(true);
                setEdit(true);
              },
            },
            {
              Label: 'Delete',
              Action: () => remove(selectedIndex),
            },
            {
              Label: 'Save',
              Action: () => {
                downloadJSON(localItems);
              },
            },
            {
              Label: 'Import',
              Action: () => {
                setLoadFileOpen(true);
              },
            },
            {
              Label: 'Load from browser',
              Action: () => {
                setLocalItems(loadFromLocalStorage());
              },
            },
            {
              Label: 'Save to browser',
              Action: () => {
                saveToLocalStorage(localItems);
              },
            },
          ]}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        />
      )}
      {formOpen && (
        <ItemForm
          modifyAction={edit ? updateForm : addForm}
          itemToModify={
            edit && selectedIndex != -1 ? localItems[selectedIndex] : null
          }
        />
      )}
      {loadFileOpen && (
        <FileLoader
          onSubmit={(items) => {
            setLocalItems(items);
            setLoadFileOpen(false);
          }}
          onCancel={() => {
            setLoadFileOpen(false);
          }}
        />
      )}
      <SettingsPanel
        CheckboxActions={[
          {
            Label: 'Add default item',
            Action: (value) => setDefaultNewChecked(value),
            Value: defaultNewChecked,
          },
          {
            Label: 'Zustand',
            Action: (value) => {
              setZustandChecked(value);
              setReduxChecked(false);
            },
            Value: zustandChecked,
          },
          {
            Label: 'Redux',
            Action: (value) => {
              setReduxChecked(value);
              setZustandChecked(false);
            },
            Value: reduxChecked,
          },
        ]}
      />
      <Timer />
    </>
  );
}
<Achievments />;
export default App;
