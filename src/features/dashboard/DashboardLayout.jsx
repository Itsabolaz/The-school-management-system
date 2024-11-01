import DashboardNumberStats from "./DashboardNumberStats";
import EventCalender from "./EventCalender";
import GenderStatsOfStudents from "./GenderStatsOfStudents";
import GenderStatsOfTeachers from "./GenderStatsOfTeachers";
import Reminders from "./Reminders";
import StatsOfStudentsReligions from "./StatsOfStudentsReligions";

function DashboardLayout() {
  return (
    <div className="space-y-8 rounded py-5">
      <DashboardNumberStats />
      <div className="flex justify-between gap-x-5">
        <div className="flex w-1/2 justify-stretch gap-x-5 [&>div]:w-1/2">
          <GenderStatsOfStudents />
          <GenderStatsOfTeachers />
        </div>
        <StatsOfStudentsReligions />
      </div>
        <div className="flex justify-between gap-x-5">
          <EventCalender />
          <Reminders />
        </div>
    </div>
  );
}

export default DashboardLayout;
