import Cell, { CellProps } from "./Cell";

interface CheckBoxCellProps extends CellProps {
  id: string;
  checked?: boolean;
  onClick: () => void;
}

const CheckBoxCell = ({
  id,
  checked,
  onClick,
  children,
  ...props
}: CheckBoxCellProps) => {
  return (
    <Cell {...props}>
      <input
        type="checkbox"
        name={id}
        id={id}
        onChange={onClick}
        checked={checked}
      />
    </Cell>
  );
};

export default CheckBoxCell;
