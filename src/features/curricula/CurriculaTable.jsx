import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import ParentsTableOperation from "../parents/ParnetsTableOperation";
import CurriculaRow from "./CurriculaRow";
import CurriculaTableOperation from "./CurriculaTableOperation";
import { useCurriculum } from "./useCurriculum";

function CurriculaTable() {
  const { curriculum, isLoading } = useCurriculum();

  if (isLoading) return <Spinner />;

  const { id, grade, ...others } = curriculum[0];

  const daysWithSubjects = Object.entries(others).map(([day, subjects]) => ({
    day,
    subjects,
  }));

  if (!curriculum)
    return (
      <Empty style="text-center text-xl font-medium">
        Curriculum data not loaded!
      </Empty>
    );

  return (
    <div className="rounded bg-white px-8 py-5 shadow-md">
      <section className="mb-12 space-y-7">
        <h1 className="text-2xl font-medium">Grade {grade} curriculum</h1>
        <CurriculaTableOperation />
      </section>
      <section className="table-container">
        {/* 
        {curriculum.every((parents) => parents.students === null) ? (
          <Empty style="text-center text-xl font-medium">
            There is no parents information related to the entered student name
          </Empty>
        ) : 
        */}
        {/* ( */}
        <Table numOfColumns={6}>
          <Table.Header>
            <th className="text-primary-gray">
              #
            </th>
            <th className="uppercase">First period</th>
            <th className="uppercase">Second period</th>
            <th className="uppercase">third period</th>
            <th className="uppercase">fourth period</th>
            <th className="uppercase">Fifth period</th>
          </Table.Header>

          <Table.Body
            data={daysWithSubjects}
            render={(curriculumItem) => (
              <CurriculaRow
                curriculumItem={curriculumItem}
                key={curriculumItem.day}
              />
            )}
          />
        </Table>
        {/* ) */}
      </section>
    </div>
  );
}

export default CurriculaTable;

/*
[
    {
        "id": 1,
        "grade": 1,
        "saturday": [
            "math",
            "literature",
            "science",
            "art",
            "Physical Education"
        ],
        "sunday": [
            "english",
            "math",
            "science",
            "literature",
            "foreign language"
        ],
        "monday": [
            "math",
            "literature",
            "social studies",
            "art",
            "english"
        ],
        "tuesday": [
            "math",
            "literature",
            "science",
            "foreign language",
            "art"
        ],
        "wednesday": [
            "math",
            "literature",
            "english",
            "science",
            "social studies"
        ]
    }
]
*/

/*
{"json":[{"id":1,"grade":1,"saturday":["math","literature","science","art","Physical Education"],"sunday":["english","math","science","literature","foreign language"],"monday":["math","literature","social studies","art","english"],"tuesday":["math","literature","science","foreign language","art"],"wednesday":["math","literature","english","science","social studies"]}]}
*/
