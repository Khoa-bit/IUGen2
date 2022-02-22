import Cell, { CellProps } from "./Cell";

export interface RowProps {
  cellsProps: CellProps[];
}

const Row = ({ cellsProps }: RowProps) => {
  const cells = cellsProps.map(({ children, ...cellProps }, index) => {
    return (
      <Cell key={index} {...cellProps}>
        {children}
      </Cell>
    );
  });

  return <tr>{cells}</tr>;
};

export default Row;
