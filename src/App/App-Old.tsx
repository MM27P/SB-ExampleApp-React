import { useEffect, useState } from 'react';
import './App.css';
import type { Item } from './Model/Item';
import { useDispatch } from 'react-redux';
import { selectItems2, type AppDispatch } from './GlobalState/RTKState';
import { fetchItem } from './GlobalState/server';
import { useZustandStore } from './GlobalState/ZustandState';
import { useAppSelector } from './GlobalState/Selectors';
import {
  downloadJSON,
  loadFromLocalStorage,
  saveToLocalStorage,
} from './Utils/BrowserUtils';
import { Timer } from './Components/Timer/Timer';

function App({ items }: { items: Item[] }) {
  const [localItems, setLocalItems] = useState<Item[]>(items);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [defaultNewChecked, setDefaultNewChecked] = useState<boolean>(true);
  const [zustandChecked, setZustandChecked] = useState<boolean>(false);
  const [reduxChecked, setReduxChecked] = useState<boolean>(false);
  const newItem = { id: 0, name: 'new', value: 69, date: new Date() };

  const [newValueId, setNewValueId] = useState<number>(0);
  const [newValueName, setNewValueName] = useState<string>('new');
  const [newValueValue, setNewValueValue] = useState<number>(0);
  const [formValid, setFormValid] = useState<boolean>(true);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [loadFileOpen, setLoadFileOpen] = useState<boolean>(false);
  const [fileData, setFileData] = useState(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);

  const add = (item: Item) => {
    const copy = [...localItems, item];
    setLocalItems(copy);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload

    if (
      newValueName === undefined ||
      newValueName === null ||
      newValueName === ''
    ) {
      setValidationMessage('Niepoprawna wartość dla wiersza');
      setFormValid(false);
      return;
    }

    add({
      id: newValueId,
      name: newValueName,
      value: newValueValue,
      date: new Date(),
    });

    setNewValueId(0);
    setNewValueName('new');
    setNewValueValue(0);
    setFormOpen(false);
    setValidationMessage('');
    setFormValid(true);
  };
  const remove = (id: number) => {
    const newList = localItems.filter((_, i) => i !== id);
    setLocalItems(newList);
    setSelectedIndex(selectedIndex - 1);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const json = JSON.parse(event.target.result as string);
      setFileData(json);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <h1>LIST IN REACT</h1>
      <ul>
        {localItems.map((item, index) => (
          <li onClick={() => setSelectedIndex(index)} key={item.id}>
            {item.name} {index === selectedIndex && 'X'}
          </li>
        ))}
      </ul>
      {!formOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <button
            onClick={() =>
              defaultNewChecked ? add(newItem) : setFormOpen(true)
            }
          >
            Add{' '}
          </button>
          <button onClick={() => {}}>Edit</button>
          <button onClick={() => remove(1)}>Delete</button>
          <button
            onClick={() => {
              downloadJSON(localItems);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setLoadFileOpen(true);
            }}
          >
            Import
          </button>
          <button
            onClick={() => {
              setLocalItems(loadFromLocalStorage());
            }}
          >
            Load from browser
          </button>
          <button
            onClick={() => {
              saveToLocalStorage(localItems);
            }}
          >
            Save to browser
          </button>
        </div>
      )}
      {formOpen && (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={newValueId}
              onChange={(e) => setNewValueId(Number(e.target.value))}
            />
            <input
              value={newValueName}
              onChange={(e) => setNewValueName(e.target.value)}
            />
            <input
              type="number"
              value={newValueValue}
              onChange={(e) => setNewValueValue(Number(e.target.value))}
            />
            <button type="submit">Submit</button>
          </form>
          {!formValid && <label>Błąd:{validationMessage}</label>}
        </div>
      )}
      {loadFileOpen && (
        <div>
          <input type="file" accept=".json" onChange={handleFile} />
          <pre>{JSON.stringify(fileData, null, 2)}</pre>
          <button
            onClick={() => {
              setLocalItems(fileData);
              setLoadFileOpen(false);
            }}
          >
            Submit
          </button>
          <button
            onClick={() => {
              setLoadFileOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div>
        <label>
          <input
            type="checkbox"
            checked={defaultNewChecked}
            onChange={(e) => setDefaultNewChecked(e.target.checked)}
          />
          Add default item
        </label>
        <label>
          <input
            type="checkbox"
            checked={zustandChecked}
            onChange={(e) => {
              setZustandChecked(e.target.checked);
              setReduxChecked(false);
            }}
          />
          Zustand
        </label>
        <label>
          <input
            type="checkbox"
            checked={reduxChecked}
            onChange={(e) => {
              setReduxChecked(e.target.checked);
              setZustandChecked(false);
            }}
          />
          Redux
        </label>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <label>-Lista itemów-</label>
        <label>-Select row-</label>
        <label>-Dodaj/Usuń-</label>
        <label>-Dodaj/Edytuj-Formularz-</label>
        <label>-Global state-</label>
        <label>-Zapisz/Wczytaj DO PLIKU [X]</label>
        <label>-Validacja [X]</label>
        <label>*Zustand/Redux/RTK[x]</label>
        <label>*useState/useEfffect[x]</label>
        <label>*selectors[X]</label>
        <label>*Counter- background task[X]</label>
      </div>
      <Timer />
    </>
  );
}

export default App;
