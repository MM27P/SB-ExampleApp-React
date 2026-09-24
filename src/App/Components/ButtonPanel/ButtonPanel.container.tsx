import { useContext, type ComponentType } from 'react';
import type { ButtonPanelProps } from './ButtonPanel';
import { AppContext } from '../../AppContext';
import {
  downloadJSON,
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../../Utils/BrowserUtils';
import { useGetListItems } from '../../GlobalState/Hooks/useGetListItems';

export function withButtonPanel(Component: ComponentType<ButtonPanelProps>) {
  return function WrappedComponent(
    props: React.HTMLAttributes<HTMLDivElement>
  ) {
    const {
      localItems,
      selectedIndex,
      defaultNewChecked,
      newItem,
      setLocalItems,
      setEdit,
      setFormOpen,
      setLoadFileOpen,
      add,
      remove,
      reduxChecked,
      zustandChecked,
      synchronise,
    } = useContext(AppContext);

    const { globalStateItems, assignItems } = useGetListItems(
      zustandChecked,
      reduxChecked
    );
    const updateGlobalStore = () => {
      if (zustandChecked || reduxChecked) {
        assignItems(localItems);
      }
    };

    const loadFromGlobalStore = () => {
      if (zustandChecked || reduxChecked) {
        setLocalItems(globalStateItems);
      }
    };
    const Buttons = [
      {
        Label: 'Add',
        Action: () => (defaultNewChecked ? add(newItem) : setFormOpen(true)),
      },
      {
        Label: 'Edit',
        Action: () => {
          if (selectedIndex != -1) {
            setFormOpen(true);
            setEdit(true);
          }
        },
      },
      {
        Label: 'Delete',
        Action: () => remove(selectedIndex),
      },
      {
        Label: 'Save',
        Action: () => downloadJSON(localItems),
      },
      {
        Label: 'Import',
        Action: () => setLoadFileOpen(true),
      },
      {
        Label: 'Load from browser',
        Action: () => setLocalItems(loadFromLocalStorage()),
      },
      {
        Label: 'Save to browser',
        Action: () => saveToLocalStorage(localItems),
      },
      {
        Label: 'Save to global store',
        Action: () => updateGlobalStore(),
        Disable: synchronise,
      },
      {
        Label: 'Load to global store',
        Action: () => loadFromGlobalStore(),
        Disable: synchronise,
      },
    ];

    return <Component {...props} Buttons={Buttons} />;
  };
}
