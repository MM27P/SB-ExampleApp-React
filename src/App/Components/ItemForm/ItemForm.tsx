import { useState } from 'react';
import type { Item } from '../../Model/Item';

type ItemFormProps = {
  itemToModify?: Item;
  modifyAction: (item: Item) => void;
  cancelAction: () => void;
};
export const ItemForm = ({
  modifyAction,
  itemToModify,
  cancelAction,
}: ItemFormProps) => {
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [newValueId, setNewValueId] = useState<number>(itemToModify?.id ?? 0);
  const [newValueName, setNewValueName] = useState<string>(
    itemToModify?.name ?? 'new'
  );
  const [newValueValue, setNewValueValue] = useState<number>(
    itemToModify?.value ?? 0
  );
  const [formValid, setFormValid] = useState<boolean>(true);

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

    modifyAction({
      id: newValueId,
      name: newValueName,
      value: newValueValue,
      date: new Date(),
    });

    setNewValueId(0);
    setNewValueName('new');
    setNewValueValue(0);
    setValidationMessage('');
    setFormValid(true);
  };
  return (
    <div className="item-form-card react-glow">
      <div className="form-header">
        <span className="settings-icon">⚛</span>
        <h2>{itemToModify ? 'Modify Item' : 'Create Item'}</h2>
      </div>

      <form className="react-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID</label>

          <input
            type="number"
            value={newValueId}
            onChange={(e) => setNewValueId(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Name</label>

          <input
            value={newValueName}
            onChange={(e) => setNewValueName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Value</label>

          <input
            type="number"
            value={newValueValue}
            onChange={(e) => setNewValueValue(Number(e.target.value))}
          />
        </div>
        <div className="header-divider" />
        <button className="react-submit-button" type="submit">
          {itemToModify ? 'Update Item' : 'Create Item'}
        </button>
        <button
          onClick={cancelAction}
          className="react-submit-button"
          type="button"
        >
          Cancel
        </button>
      </form>

      {!formValid && <div className="form-error">⚠ {validationMessage}</div>}
    </div>
  );
};
