import { TrashIcon } from "@heroicons/react/solid";
import Cell from "./Cell";
import CheckBoxCell from "./CheckBoxCell";
import DeleteCell from "./DeleteCell";

interface HeaderRowProps {
  getAllStateHandler: () => boolean;
  toggleAllStateHandler: () => void;
  deleteAllHandler: () => void;
}

const FilterHeader = ({
  getAllStateHandler,
  toggleAllStateHandler,
  deleteAllHandler,
}: HeaderRowProps) => {
  return (
    <tr className="bg-sky-400 text-white">
      <CheckBoxCell
        className="w-1/12"
        id="headerAll"
        checked={getAllStateHandler()}
        onClick={toggleAllStateHandler}
        useTH={true}
      ></CheckBoxCell>
      <Cell className="w-1/5" useTH={true}>
        Date
      </Cell>
      <Cell className="w-1/5" useTH={true}>
        Start Period
      </Cell>
      <Cell className="w-1/5" useTH={true}>
        No. Periods
      </Cell>
      <Cell className="w-1/5" useTH={true}>
        Lecturer
      </Cell>
      <DeleteCell className="w-1/12" onClick={deleteAllHandler} useTH={true}>
        <TrashIcon className="h-6 w-6 transition-colors hover:text-sky-100"></TrashIcon>
      </DeleteCell>
    </tr>
  );
};

export default FilterHeader;
