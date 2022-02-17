import { nanoid } from "nanoid";
import Cell, { CellProps } from "./Cell";

export interface RowProps {
  cellsProps: CellProps[];
}

const Row = ({ cellsProps }: RowProps) => {
  const cells = cellsProps.map((cellProps) => {
    return (
      <Cell
        content={cellProps.content}
        isHidden={cellProps.isHidden}
        rowSpan={cellProps.rowSpan}
        key={nanoid(5)}
      ></Cell>
    );
  });

  return <tr>{cells}</tr>;
};

export default Row;
