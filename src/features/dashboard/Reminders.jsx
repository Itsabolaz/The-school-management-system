import ReminderRow from "./ReminderRow";
import { useReminders } from "./useReminders";

const REMINDERS_COLOR = ["#40DFCD", "#FBD540", "#F939A1", "#2139DE", "#F22829"];

function Reminders() {
  const { reminders, isLoading } = useReminders();
  if (isLoading) return null;

  return (
    <div className="h-[440px] w-1/2 rounded-md bg-white px-7 shadow-lg">
      <h1 className="pt-7 text-2xl font-medium">The closest reminders</h1>
      <div className="flex h-4/5 flex-col justify-around divide-y-2 divide-secendary-gray overflow-y-scroll">
        {reminders.map((reminder, index) => (
          <ReminderRow
            key={reminder.id}
            date={reminder.event_date}
            dateBgColor={REMINDERS_COLOR[index % REMINDERS_COLOR.length]}
            description={reminder.event_description}
            reminderId={reminder.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Reminders;
