import { RadioButtonsPanel, type RadioGroupProps } from './RadioButtonsPanel';

type CheckboxnAction = {
  Label: string;
  Action: (value: boolean) => any | void;
  Value: boolean;
  Disable?: boolean;
};

export type StoreType = 'Redux' | 'Zustand';

type CheckBoxPanelProps = {
  CheckboxActions: CheckboxnAction[];
  RadioGroup?: RadioGroupProps<StoreType>;
};

export const SettingsPanel = ({
  CheckboxActions,
  RadioGroup,
}: CheckBoxPanelProps) => {
  return (
    <div className="settings-box">
      <div className="settings-header">
        <span className="settings-icon">⚛</span>
        <h2>Settings</h2>
      </div>
      <div className="header-divider" />

      <div className="settings-list">
        {CheckboxActions.map((checkBox, index) => (
          <label
            key={index}
            className={`settings-item ${checkBox.Value ? 'active' : ''}`}
          >
            <input
              type="checkbox"
              checked={checkBox.Value}
              onChange={(e) => checkBox.Action(e.target.checked)}
              disabled={checkBox.Disable === true}
            />

            <span className="checkbox-ui" />

            <span className="checkbox-label">{checkBox.Label}</span>
          </label>
        ))}
        {RadioGroup && (
          <RadioButtonsPanel
            changeSelected={RadioGroup.changeSelected}
            selected={RadioGroup.selected}
            values={RadioGroup.values}
          />
        )}
      </div>
    </div>
  );
};
