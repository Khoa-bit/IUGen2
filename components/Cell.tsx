export interface CellProps {
  children?:
    | JSX.Element
    | string
    | number
    | JSX.Element[]
    | string[]
    | number[];
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  useTH?: boolean;
}

const Cell = ({ children, className, colSpan, rowSpan, useTH }: CellProps) => {
  const applyClass = `py-2 ${className || ""}`;
  return (
    <>
      {useTH ? (
        <th className={applyClass} rowSpan={rowSpan} colSpan={colSpan}>
          {children}
        </th>
      ) : (
        <td className={applyClass} rowSpan={rowSpan} colSpan={colSpan}>
          {children}
        </td>
      )}
    </>
  );
};

export default Cell;
