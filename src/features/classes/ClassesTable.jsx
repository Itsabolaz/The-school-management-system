import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ClassesRow from "./ClassesRow";
import { useClasses } from "./useClasses";

function ClassesTable() {
  // const { isLoading, data } = useClasses();
  const { classes, students, isLoading } = useClasses();

  if (isLoading) return <Spinner />;

  if (!classes)
    return (
      <Empty style="text-center text-xl font-medium">
        Classes data not loaded!
      </Empty>
    );

  return (
    <div className="rounded bg-white px-8 py-5 shadow-md">
      <section className="mb-12 mt-5 space-y-7">
        <h1 className="text-3xl font-medium">All classes Data</h1>
      </section>
      <section className="table-container">
        <Table numOfColumns={6}>
          <Table.Header>
            <th>Class</th>
            <th>Teacher Name</th>
            <th>Number of students</th>
            <th>Weekly Curriculum Schedule</th>
          </Table.Header>

          <Table.Body
            data={classes}
            render={(classRow) => (
              <ClassesRow
                classRow={classRow}
                studentsData={students}
                key={classRow.id}
              />
            )}
          />
        </Table>
      </section>
    </div>
  );
}

export default ClassesTable;
