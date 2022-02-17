export interface CellProps {
  content: string;
  isHidden?: boolean;
  rowSpan?: number;
}

const Cell = ({ content, isHidden, rowSpan }: CellProps) => (
  <td
    className="border border-slate-700 bg-slate-100 py-1 text-center"
    hidden={isHidden}
    rowSpan={rowSpan}
  >
    {content}
  </td>
);

export default Cell;
