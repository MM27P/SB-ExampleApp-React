import { useContext } from 'react';
import { ItemForm } from './ItemForm';
import { AppContext } from '../../AppContext';

export function ItemFormContainer() {
  const {
    localItems,
    edit,
    setEdit,
    selectedIndex,
    updateForm,
    addForm,
    setFormOpen,
  } = useContext(AppContext);

  const onCancel = () => {
    setEdit(false);
    setFormOpen(false);
  };
  return (
    <ItemForm
      modifyAction={edit ? updateForm : addForm}
      itemToModify={
        edit && selectedIndex != -1 ? localItems[selectedIndex] : null
      }
      cancelAction={onCancel}
    />
  );
}
