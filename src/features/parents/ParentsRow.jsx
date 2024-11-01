import { BsPersonVcard } from "react-icons/bs";
import Table from "../../ui/Table";
import { Link, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/helper";

function ParentsRow({
  parents: {
    id: parentId,
    fatherName,
    motherName,
    fatherOccupation,
    phoneNumber,
    students: { id:studentId , studentName , grade },
  },
})
{

  const navigate = useNavigate();
  
  return (
    <Table.Row>
      <td>{capitalizeFirstLetter(fatherName)}</td>
      <td>{capitalizeFirstLetter(motherName)}</td>
      <td>
        <Link
          className="hover:bg-secendary-gray p-1 rounded transition-all"
          to={`/all-students/${studentId}`}
        >
          {capitalizeFirstLetter(studentName)}
        </Link>
      </td>
      <td>{grade}</td>
      <td>{fatherOccupation}</td>
      <td>{phoneNumber}</td>
      <td className="[&>svg]:m-auto">
        <BsPersonVcard
          className="h-[2.5em] w-[2.5em] cursor-pointer rounded-full py-2 transition-all hover:bg-secendary-gray"
          onClick={() => navigate(`/parents/${parentId}`)}
        />
      </td>
    </Table.Row>
  );
}

export default ParentsRow;
