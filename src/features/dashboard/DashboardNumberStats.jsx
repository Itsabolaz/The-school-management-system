import { PiStudentFill } from "react-icons/pi";
import { HiAcademicCap, HiMiniUserGroup } from "react-icons/hi2";
import { ImManWoman } from "react-icons/im";
import StatsOfNumberOfUsers from "../../ui/StatsOfNumberOfUsers";
import { useStudents } from "../students/useStudents";
import { useAllParents } from "../parents/useAllParents";
import { useTeachers } from "../teachers/useTeachers";
import { useClasses } from "../classes/useClasses";
import NumberStatsLoader from "../../ui/NumberStatsLoader";
function DashboardNumberStats() {
  const { count: numberOfStudents, isLoading: isLoading1 } = useStudents();
  const { count: numberOfParents, isLoading: isLoading2 } = useAllParents();
  const { count: numberofTeachers, isLoading: isLoading3 } = useTeachers();
  const { count: numberOfClasses, isLoading: isLoading4 } = useClasses();

  const isLoading = isLoading1 || isLoading2 || isLoading3 || isLoading4;

  // if (isLoading) return <NumberStatsLoader />;

  return (
    <div
      className={`flex justify-between gap-x-5 ${isLoading ? "animate-pulse" : ""}`}
    >
      <div className="flex w-1/2 gap-x-5">
        <StatsOfNumberOfUsers
          icon={<PiStudentFill className="h-10 w-10 text-primary-green" />}
          bgIconColor="#D1F3E0"
          userType="Students"
          count={numberOfStudents}
          isLoading={isLoading1}
        />
        <StatsOfNumberOfUsers
          icon={<HiMiniUserGroup className="h-10 w-10 text-secendary-blue" />}
          bgIconColor="#E1F1FF"
          userType="Teachers"
          count={numberofTeachers}
          isLoading={isLoading2}
        />
      </div>
      <div className="flex w-1/2 gap-x-5">
        <StatsOfNumberOfUsers
          icon={<ImManWoman className="h-9 w-9 text-primary-orange" />}
          bgIconColor="#FFF2D8"
          userType="Parents"
          count={numberOfParents}
          isLoading={isLoading3}
        />
        <StatsOfNumberOfUsers
          icon={<HiAcademicCap className="h-10 w-10 text-primary-red" />}
          bgIconColor="#FFEAEA"
          userType="Classes"
          count={numberOfClasses}
          isLoading={isLoading4}
        />
      </div>
    </div>
  );
}

export default DashboardNumberStats;
