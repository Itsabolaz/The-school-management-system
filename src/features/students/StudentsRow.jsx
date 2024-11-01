import { BsPersonVcard } from "react-icons/bs";
import Table from "../../ui/Table";
import { capitalizeFirstLetter, convertDateFormat } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

function StudentsRow({
  student: {
    id: studentId,
    nationalId,
    studentName,
    gender,
    dateOfBirth,
    grade,
    parents: { fatherName },
  },
}) {
  const navigate = useNavigate();

  return (
    <Table.Row>
      <td>{nationalId}</td>
      <td>{capitalizeFirstLetter(studentName)}</td>
      <td>{gender}</td>
      <td>{grade}</td>
      <td>{capitalizeFirstLetter(fatherName)}</td>
      <td>{convertDateFormat(dateOfBirth)}</td>
      <td className="[&>svg]:m-auto">
        <BsPersonVcard
          className="h-[2.5em] w-[2.5em] cursor-pointer rounded-full py-2 transition-all hover:bg-secendary-gray"
          onClick={() => navigate(`/all-students/${studentId}`)}
        />
      </td>
    </Table.Row>
  );
}

export default StudentsRow;
