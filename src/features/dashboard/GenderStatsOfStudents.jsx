import { useStudents } from "../students/useStudents";
import GenderStatsPie from "./GenderStatsPie";

function GenderStatsOfStudents() {
  const { students, isLoading } = useStudents();
  return (
    <div className="h-[500px] rounded-md bg-white shadow-lg">
      <h1 className="ml-7 pt-7 text-2xl font-medium">Students</h1>
      <GenderStatsPie users={students} isLoading={isLoading} userType='students'/>
    </div>
  );
}

export default GenderStatsOfStudents;

//w-[22%]