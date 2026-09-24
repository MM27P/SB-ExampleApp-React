import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { SettingsPanel } from './SettingsPanel';
import type { RadioGroupProps } from './RadioButtonsPanel';

export function SettingsPanelContainer() {
  const {
    defaultNewChecked,
    zustandChecked,
    reduxChecked,
    merge,
    synchronise,
    setDefaultNewChecked,
    setZustandChecked,
    setReduxChecked,
    setMerge,
    setSynchronise,
  } = useContext(AppContext);

  const CheckboxActions = [
    {
      Label: 'Add default item',
      Action: (value: boolean) => setDefaultNewChecked(value),
      Value: defaultNewChecked,
    },
    {
      Label: 'Merge new items',
      Action: (value: boolean) => setMerge(value),
      Value: merge,
    },
    {
      Label: 'Synchronise with store',
      Action: (value: boolean) => setSynchronise(value),
      Value: synchronise,
    },
    {
      Label: 'Zustand',
      Action: (value: boolean) => {
        setZustandChecked(value);
        setReduxChecked(false);
      },
      Value: zustandChecked,
      Disable: zustandChecked,
    },
    {
      Label: 'Redux',
      Action: (value: boolean) => {
        setReduxChecked(value);
        setZustandChecked(false);
      },
      Value: reduxChecked,
      Disable: reduxChecked,
    },
  ];

  return <SettingsPanel CheckboxActions={CheckboxActions} />;
}
