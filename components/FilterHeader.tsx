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
    <tr>
      <CheckBoxCell
        id="headerAll"
        checked={getAllStateHandler()}
        onClick={toggleAllStateHandler}
        useTH={true}
      ></CheckBoxCell>
      <Cell useTH={true}>Date</Cell>
      <Cell useTH={true}>Start Period</Cell>
      <Cell useTH={true}>No. Periods</Cell>
      <Cell useTH={true}>Lecturer</Cell>
      <DeleteCell onClick={deleteAllHandler} useTH={true}>
        Remove
      </DeleteCell>
    </tr>
  );
};

export default FilterHeader;
