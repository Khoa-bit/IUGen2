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
      <div className="flex justify-center">
        <input
          className="h-[18px] w-[18px] rounded 
          border border-slate-300 text-sky-500 transition-colors hover:text-sky-300
          focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-offset-2"
          type="checkbox"
          name={id}
          id={id}
          onChange={onClick}
          checked={checked}
        />
      </div>
    </Cell>
  );
};

export default CheckBoxCell;
