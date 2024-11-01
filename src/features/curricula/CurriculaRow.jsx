import Table from "../../ui/Table";
import { capitalizeFirstLetter } from "../../utils/helper";

function CurriculaRow({ curriculumItem: { day, subjects } }) {
  return (
    <Table.Row>
      <td className="font-semibold text-primary-blue uppercase">{day}</td>
      <td>{capitalizeFirstLetter(subjects[0])}</td>
      <td>{capitalizeFirstLetter(subjects[1])}</td>
      <td>{capitalizeFirstLetter(subjects[2])}</td>
      <td>{capitalizeFirstLetter(subjects[3])}</td>
      <td>{capitalizeFirstLetter(subjects[4])}</td>
    </Table.Row>
  );
}

export default CurriculaRow;

/*
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
*/
