import { useTeachers } from "../teachers/useTeachers";
import GenderStatsPie from "./GenderStatsPie";

function GenderStatsOfTeachers() {
  const { teachers, isLoading } = useTeachers();

  return (
    <div className="h-[500px] rounded-md bg-white shadow-lg">
      <h1 className="ml-7 pt-7 text-2xl font-medium">Teachers</h1>
      <GenderStatsPie users={teachers} isLoading={isLoading} userType='teachers'/>
    </div>
  );
}

export default GenderStatsOfTeachers;
// w-[22%]