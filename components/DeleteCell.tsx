import Cell, { CellProps } from "./Cell";

interface DeleteCellProps extends CellProps {
  onClick: () => void;
}

const DeleteCell = ({ onClick, children, ...props }: DeleteCellProps) => {
  return (
    <Cell {...props}>
      <button onClick={onClick}>{children}</button>
    </Cell>
  );
};

export default DeleteCell;
