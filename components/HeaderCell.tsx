import { CellProps } from "./Cell";

export interface HeaderCellProps extends CellProps {}

const HeaderCell = ({
  children,
  className,
  colSpan,
  rowSpan,
}: HeaderCellProps) => {
  const applyClass = `py-2 ${className || ""}`;
  return (
    <th className={applyClass} rowSpan={rowSpan} colSpan={colSpan}>
      {children}
    </th>
  );
};

export default HeaderCell;
