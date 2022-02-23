import Cell, { CellProps } from "./Cell";

interface DeleteCellProps extends CellProps {
  onClick: () => void;
}

const DeleteCell = ({ onClick, children, ...props }: DeleteCellProps) => {
  return (
    <Cell {...props}>
      <div className="flex justify-center">
        <button
          className="rounded focus:border-sky-300 focus:outline-none focus:ring focus:ring-sky-200
          focus:ring-offset-2"
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    </Cell>
  );
};

export default DeleteCell;
