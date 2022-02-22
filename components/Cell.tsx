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
  hidden?: boolean;
  bgColor?: string;
  className?: string;
  useTH?: boolean;
}

const Cell = ({
  children,
  className,
  colSpan,
  bgColor,
  hidden,
  rowSpan,
  useTH,
}: CellProps) => {
  const applyClass =
    className ??
    `border-collapse border border-slate-200 ${bgColor ? bgColor : ""}`;
  return (
    <>
      {useTH ? (
        <th
          className={applyClass}
          rowSpan={rowSpan}
          colSpan={colSpan}
          hidden={hidden}
        >
          {children}
        </th>
      ) : (
        <td
          className={applyClass}
          rowSpan={rowSpan}
          colSpan={colSpan}
          hidden={hidden}
        >
          {children}
        </td>
      )}
    </>
  );
};

export default Cell;
