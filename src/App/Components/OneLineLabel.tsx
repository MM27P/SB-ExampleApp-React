export type OneLineLabelProps = {
  Label: string;
  Value: string | number;
} & React.HTMLAttributes<HTMLDivElement>;

export const OneLineLabel = ({ Label, Value, ...props }: OneLineLabelProps) => {
  return (
    <div {...props}>
      {Label}: {Value}
    </div>
  );
};
