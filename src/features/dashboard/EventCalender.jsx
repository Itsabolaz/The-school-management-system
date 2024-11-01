// import { useState } from "react";
import { useState, useEffect } from "react";
import { Calendar } from "react-multi-date-picker";
import { useReminders } from "./useReminders";
import AddNewReminder from "./AddNewReminder";

function EventCalender() {
  const [values, setValues] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { reminders } = useReminders();

  useEffect(
    function () {
      const eventsDate = reminders?.map(
        (reminder) => new Date(reminder.event_date),
      );
      setValues(eventsDate);
    },
    [reminders],
  );

  function handleFocusedDateChange(dateClicked) {
    setValues([...values]);
    setSelectedDate(dateClicked);
    setIsAddModalOpen(true);
  }

  return (
    <div className="h-[440px] w-1/2 rounded-md bg-white shadow-lg">
      <h1 className="ml-7 pt-7 text-2xl font-medium">Event Calender</h1>
      <Calendar
        multiple
        value={values}
        className="custom-calender"
        onFocusedDateChange={handleFocusedDateChange}
        mapDays={({ date }) => {
          let isSelected = values?.some(
            (value) =>
              new Date(value).toDateString() === new Date(date).toDateString(),
          );
          if (isSelected)
            return {
              disabled: true,
              style: {
                pointerEvents: "none",
                backgroundColor: "#d60a0b",
                color: "#fff",
              },
            };
        }}
      />
      <AddNewReminder
        selectedDate={selectedDate}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </div>
  );
}

export default EventCalender;
