import Table from "../../ui/Table";
import StudentsRow from "./StudentsRow";
import { useStudents } from "./useStudents";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import StudentsTableOperation from "./StudentsTableOperation";

function StudentsTable() {
  const { students, isLoading , count } = useStudents();

  if (isLoading) return <Spinner />;

  if (!students)
    return (
      <Empty style="text-center text-xl font-medium">
        Students data not loaded!
      </Empty>
    );

  return (
    <div className="rounded bg-white px-8 py-5 shadow-md">
      <section className="mb-12 space-y-7">
        <h1 className="text-2xl font-medium">All Students Data</h1>
        <StudentsTableOperation />
      </section>
      <section>
        {!students.length ? (
          <Empty style="text-center text-xl font-medium">
            There is no parent information related to the entered student name
          </Empty>
        ) : (
          <Table numOfColumns={7}>
            <Table.Header>
              <th>National ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Class</th>
              <th>Father Name</th>
              <th>Date of Birth</th>
              <th>More details</th>
            </Table.Header>

            <Table.Body
              data={students}
              render={(student) => (
                <StudentsRow student={student} key={student.id} />
              )}
            />
          </Table>
        )}
      </section>
      <Pagination count={count} />
    </div>
  );
}

export default StudentsTable;
