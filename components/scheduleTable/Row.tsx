import Cell from "./Cell";

interface RowProps {
  cellCount: number;
  rowHeader: string;
}

const Row = ({ cellCount, rowHeader }: RowProps) => {
  const cells = [<Cell content={rowHeader} key={0}></Cell>];
  for (let i = 1; i < cellCount; i++) {
    cells.push(<Cell content="_" key={i}></Cell>);
  }

  return <tr>{cells}</tr>;
};

export default Row;
