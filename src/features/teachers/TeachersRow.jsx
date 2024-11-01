import { BsPersonVcard } from "react-icons/bs";
import { capitalizeFirstLetter, convertDateFormat } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";

function TeachersRow({
  teacher: {
    id: teacherId,
    nationalId,
    fullName,
    gender,
    grade,
    dateOfBirth,
  },
}) {
  const navigate = useNavigate();

  return (
    <Table.Row>
      <td>{nationalId}</td>
      <td>{capitalizeFirstLetter(fullName)}</td>
      <td>{gender}</td>
      <td>{grade}</td>
      <td>{convertDateFormat(dateOfBirth)}</td>
      <td className="[&>svg]:m-auto">
        <BsPersonVcard
          className="h-[2.5em] w-[2.5em] cursor-pointer rounded-full py-2 transition-all hover:bg-secendary-gray"
          onClick={() => navigate(`/all-teachers/${teacherId}`)}
        />
      </td>
    </Table.Row>
  );
}

export default TeachersRow;
