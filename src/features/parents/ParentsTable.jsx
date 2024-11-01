import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ParentsRow from "./ParentsRow";
import ParentsTableOperation from "./ParnetsTableOperation";
import { useAllParents } from "./useAllParents";

function ParentsTable() {
  const { isLoading, parentsData , count } = useAllParents();

  if (isLoading) return <Spinner />;
  if (!parentsData)
    return (
      <Empty style="text-center text-xl font-medium">
        Parents data not loaded!
      </Empty>
    );

  return (
    <div className="rounded bg-white px-8 py-5 shadow-md">
      <section className="mb-12 space-y-7">
        <h1 className="text-2xl font-medium">All Parents Data</h1>
        <ParentsTableOperation />
      </section>
      <section className="table-container">
        {parentsData.every((parents) => parents.students === null) ? (
          <Empty style="text-center text-xl font-medium">
            There is no parents information related to the entered student name
          </Empty>
        ) : (
          <Table numOfColumns={6}>
            <Table.Header>
              <th>Father Name</th>
              <th>Mother Name</th>
              <th>Student Name</th>
              <th>Student Grade</th>
              <th>Father Occupation</th>
              <th>Phone Number</th>
              <th>More details</th>
            </Table.Header>

            <Table.Body
              data={parentsData.filter((parents) => parents.students !== null)}
              render={(parents) => (
                <ParentsRow parents={parents} key={parents.id} />
              )}
            />
          </Table>
        )}
      </section>
      <Pagination count={count} />
    </div>
  );
}

export default ParentsTable;
