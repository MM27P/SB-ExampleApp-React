type ButtonAction = {
  Label: string;
  Action: () => any | void;
  Disable?: boolean;
};

export type ButtonPanelProps = {
  Buttons: ButtonAction[];
} & React.HTMLAttributes<HTMLDivElement>;

export const ButtonPanel = ({
  Buttons,
  className = '',
  ...rest
}: ButtonPanelProps) => {
  return (
    <div className={`button-panel ${className}`} {...rest}>
      {Buttons.map((action, index) => (
        <button
          className="react-button"
          key={index}
          onClick={action.Action}
          disabled={action.Disable === true}
        >
          {action.Label}
        </button>
      ))}
    </div>
  );
};
