import { CellProps } from "./Cell";

export interface HeaderCellProps extends CellProps {}

const HeaderCell = ({
  children,
  className,
  colSpan,
  bgColor,
  hidden,
  rowSpan,
}: HeaderCellProps) => {
  const applyClass =
    className ??
    `border-collapse border border-slate-200 ${bgColor ? bgColor : ""}`;
  return (
    <th
      className={applyClass}
      rowSpan={rowSpan}
      colSpan={colSpan}
      hidden={hidden}
    >
      {children}
    </th>
  );
};

export default HeaderCell;
