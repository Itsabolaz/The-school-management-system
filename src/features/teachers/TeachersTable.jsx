import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TeachersRow from "./TeachersRow";
import TeachersTableOperation from "./TeachersTableOperation";
import { useTeachers } from "./useTeachers";

function TeachersTable() {
    const { teachers, isLoading } = useTeachers();

  if (isLoading) return <Spinner />;

  if (!teachers)
    return (
      <Empty style="text-center text-xl font-medium">
        Teachers data not loaded!
      </Empty>
    );

  return (
    <div className="rounded bg-white px-8 py-5 shadow-md">
      <section className="mb-12 space-y-7">
        <h1 className="text-2xl font-medium">All Teachers Data</h1>
        <TeachersTableOperation />
      </section>
      <section>
        {!teachers.length ? (
          <Empty style="text-center text-xl font-medium">
            There is no Teachers information related to the entered student name
          </Empty>
        ) : (
          <Table numOfColumns={7}>
            <Table.Header>
              <th>National ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Class</th>
              <th>Date of Birth</th>
              <th>More details</th>
            </Table.Header>

            <Table.Body
              data={teachers}
              render={(teacher) => (
                <TeachersRow teacher={teacher} key={teacher.id} />
              )}
            />
          </Table>
        )}
      </section>
    </div>
  );
}

export default TeachersTable
