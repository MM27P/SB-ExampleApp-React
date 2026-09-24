import { useEffect, useState } from 'react';
import './App.css';
import './Styles/header.css';
import './Styles/listItem.css';
import './Styles/itemForm.css';
import './Styles/buttonPanel.css';
import './Styles/settings.css';
import './Styles/fileLoader.css';
import './Styles/messageDisplayer.css';
import { withButtonPanel } from './Components/ButtonPanel/ButtonPanel.container';
import { ButtonPanel } from './Components/ButtonPanel/ButtonPanel';
import { withTimer } from './Components/Timer/TimerHOC';
import { OneLineLabel } from './Components/OneLineLabel';
import { useGetListItems } from './GlobalState/Hooks/useGetListItems';
import { AppContext } from './AppContext';
import { AppHeader } from './AppHeader';
import { ListItemContainer } from './Components/ListItems/ListItemContainer';
import { ItemFormContainer } from './Components/ItemForm/ItemFormContainer';
import { FileLoaderContainer } from './Components/FileLoader/FileLoaderContainer';
import { SettingsPanelContainer } from './Components/Settings/SettingsPanelContainer';
import { Timer } from './Components/Timer/Timer';
import { Achievments } from './Components/Achievments';
import { useItemList } from './Hooks/useItemsList';
import type { Item } from './Model/Item';
import { MessageDisplayer } from './MessageDisplayer';
import { ReturnIfFlag } from './Utils/StyleUtils';
//Containers/HOC
const ButtonPanelEnhanced = withButtonPanel(ButtonPanel);
const TimerHoc = withTimer(OneLineLabel);

function App({ items }: { items: Item[] }) {
  const {
    localItems,
    setLocalItems,
    selectedIndex,
    setSelectedIndex,
    add,
    remove,
    update,
  } = useItemList(items);

  const [defaultNewChecked, setDefaultNewChecked] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [zustandChecked, setZustandChecked] = useState<boolean>(false);
  const [reduxChecked, setReduxChecked] = useState<boolean>(false);
  const newItem = { id: 0, name: 'new', value: 69, date: new Date() };
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [loadFileOpen, setLoadFileOpen] = useState<boolean>(false);
  const [merge, setMerge] = useState<boolean>(true);
  const [synchronise, setSynchronise] = useState<boolean>(true);

  const { globalStateItems, assignItems } = useGetListItems(
    zustandChecked,
    reduxChecked
  );
  const flag = false;

  const loadNewLocalItems = (newItems: Item[]) => {
    if (merge) {
      setLocalItems([...localItems, ...newItems]);
      assignItems([...localItems, ...newItems]);
    } else {
      setLocalItems(newItems);
      assignItems(newItems);
    }
  };

  useEffect(() => {
    loadGlobalItems();
  }, [synchronise, globalStateItems]);

  const loadGlobalItems = () => {
    if (synchronise && globalStateItems && globalStateItems.length > 0)
      setLocalItems(globalStateItems);
  };

  const addForm = (item: Item) => {
    add(item);
    setFormOpen(false);
  };

  const updateForm = (item: Item) => {
    update(item);
    setFormOpen(false);
    setEdit(false);
  };

  const select = (index: number) => {
    if (!edit) {
      setSelectedIndex(index);
    }
  };
  const ReturnIfFlag = (style: string) => {
    return flag ? style : '';
  };
  const contextParameters = {
    localItems,
    setLocalItems: loadNewLocalItems,
    selectedIndex,
    setSelectedIndex,
    defaultNewChecked,
    setDefaultNewChecked,
    edit,
    setEdit,
    zustandChecked,
    setZustandChecked,
    reduxChecked,
    setReduxChecked,
    formOpen,
    setFormOpen,
    loadFileOpen,
    setLoadFileOpen,
    newItem,
    add,
    remove,
    select,
    addForm,
    updateForm,
    merge,
    setMerge,
    synchronise,
    setSynchronise,
  };
  return (
    <AppContext.Provider value={contextParameters}>
      <div className={ReturnIfFlag('app-layout')}>
        <AppHeader />
        <div className="section-divider" />
        <div className="top-section">
          {/* LEFT SIDE */}
          <div className="left-panel react-glow">
            <ListItemContainer />
          </div>

          {/* RIGHT SIDE */}
          <div className="right-panel">
            {!formOpen && (
              <div className="react-card">
                <ButtonPanelEnhanced />
              </div>
            )}

            {formOpen && (
              <div className="react-card">
                <ItemFormContainer />
              </div>
            )}

            {loadFileOpen && (
              <div className="react-card">
                <FileLoaderContainer />
              </div>
            )}

            <div className="settings-panel">
              <SettingsPanelContainer />
            </div>
          </div>
        </div>
        <div className="section-divider" />
        <MessageDisplayer
          messages={['REACT', 'ANGULAR', 'VUE']}
          time={3}
        />
        <div className="section-divider" />
        {/* TIMERS */}
        <div className="timers-section">
          <div className="timer-card">
            <Timer />
          </div>

          <div className="timer-card">
            <Timer />
          </div>

          <div className="timer-card">
            <TimerHoc />
          </div>
        </div>
        <div className="double-divider" />
      </div>
    </AppContext.Provider>
  );
}
<Achievments />;
export default App;
