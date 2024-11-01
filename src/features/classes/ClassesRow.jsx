import Table from "../../ui/Table";
import { Link, useNavigate } from "react-router-dom";
import { CgMenuLeftAlt } from "react-icons/cg";
import { capitalizeFirstLetter } from "../../utils/helper";

function ClassesRow({
  classRow: {
    grade,
    teacher_id: { id: teacherId, fullName: teacherName },
  },
  studentsData,
}) {
  const navigate = useNavigate();

  const numOfStudentsInClass = studentsData.filter(
    (student) => student.grade === grade,
  ).length;

  return (
    <Table.Row>
      <td>{grade}</td>
      <td>
        <Link
          className="rounded p-1 transition-all hover:underline hover:underline-offset-[6px]"
          to={`/all-teachers/${teacherId}`}
        >
          {capitalizeFirstLetter(teacherName)}
        </Link>
      </td>
      <td>
        <span className="text-lg">{numOfStudentsInClass}</span>
        <Link
          className="ml-2 rounded p-1 text-sm transition-all hover:underline hover:underline-offset-2"
          to={`/all-students?class=${grade}`}
        >
          (See all)
        </Link>
      </td>
      <td className="[&>svg]:m-auto">
        <CgMenuLeftAlt
          className="h-[2.7em] w-[2.7em] cursor-pointer rounded-full py-2 transition-all hover:bg-secendary-gray"
          onClick={() => navigate(`/curricula?class=${grade}`)}
        />
      </td>
    </Table.Row>
  );
}

export default ClassesRow;
