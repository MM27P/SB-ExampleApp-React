export type RadioGroupProps<T extends string> = {
  values: readonly T[];
  selected: T;
  changeSelected: (value: T) => void;
};

export function RadioButtonsPanel<T extends string>({
  values,
  selected,
  changeSelected,
}: RadioGroupProps<T>) {
  return (
    <div>
      {values.map((value) => (
        <label key={value}>
          <input
            type="radio"
            name="radio-group"
            value={value}
            checked={selected === value}
            onChange={() => changeSelected(value)}
          />
          {value}
        </label>
      ))}
    </div>
  );
}
