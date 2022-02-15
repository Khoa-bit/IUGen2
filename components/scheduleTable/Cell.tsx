interface CellProps {
  content: string;
}

const Cell = ({ content }: CellProps) => (
  <td className="border border-slate-700 bg-slate-100 py-1 text-center">
    {content}
  </td>
);

export default Cell;
