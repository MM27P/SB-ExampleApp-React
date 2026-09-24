import type { Item } from '../../Model/Item';

export type ListItemProps = {
  ItemsActions: {
    item: Item;
    select: () => void;
    selected: boolean;
  }[];
};

export const ListItem = ({ ItemsActions }: ListItemProps) => {
  return (
    <div className="items-list">
      {ItemsActions.map((itemAction, index) => (
        <div
          key={index}
          onClick={itemAction.select}
          className={`list-row ${itemAction.selected ? 'selected' : ''}`}
        >
          {/* React Symbol */}
          <div className="react-list-icon">⚛</div>
          {/* Name */}
          <div className="list-item-name">{itemAction.item.name}</div>
          {/* Value */}
          <div className="list-item-value">{itemAction.item.value}</div>
          {/* Selected Badge */}{' '}
          <div className="row-action-slot">
            {itemAction.selected && (
              <div className="selected-badge">ACTIVE</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
