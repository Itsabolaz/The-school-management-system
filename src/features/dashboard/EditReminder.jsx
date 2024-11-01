import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useEditReminder } from "./useEditReminder";
import ReminderModalForm from "../../ui/ReminderModalForm";
import DatePicker from "react-multi-date-picker";
import { useReminders } from "./useReminders";

export default function EditReminder({
  isEditModalOpen,
  setIsEditModalOpen,
  currentDate,
  reminderId,
  currentDescription,
}) {
  const [descriptionInput, setDescriptionInput] = useState(currentDescription);
  const [dateInput, setDateInput] = useState(currentDate);
  const descInputRef = useRef(null);
  const { editReminder, isEditting } = useEditReminder();
  const { reminders } = useReminders();

  const handleEditReminder = useCallback(() => {
    const inputRegex = /^(?!\s)(?!\s*$).+/;

    if (inputRegex.test(descriptionInput)) {
      const formatSelectedDate = new Date(dateInput).toISOString();

      editReminder(
        {
          reminderId: reminderId,
          updatedReminder: {
            event_description: descriptionInput,
            event_date: formatSelectedDate,
          },
        },
        { onSuccess: () => setIsEditModalOpen(false) },
      );
    } else {
      toast.error(
        "Input must have at least one character and not start with a space.",
      );
    }
  }, [
    editReminder,
    descriptionInput,
    dateInput,
    setIsEditModalOpen,
    reminderId,
  ]);

  function handleCloseModal() {
    setIsEditModalOpen(false);
  }

  if (!isEditModalOpen) return null;
  return (
    <ReminderModalForm
      onSubmitReminder={handleEditReminder}
      isDoing={isEditting}
      modalTitle="Edit Reminder"
      onCloseModal={handleCloseModal}
      descInputRef={descInputRef}
    >
      <input
        type="text"
        placeholder="Enter reminder title or desc."
        ref={descInputRef}
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
        className="text-lg"
      />
      <DatePicker
        value={new Date(dateInput)}
        onFocusedDateChange={(dateClicked) => setDateInput(dateClicked)}
        calendarPosition="bottom"
        mapDays={({ date }) => {
          let isSelected = reminders
            ?.map((reminder) => reminder.event_date)
            .some(
              (value) =>
                new Date(value).toDateString() ===
                new Date(date).toDateString(),
            );
          if (isSelected)
            return {
              disabled: true,
              style: {
                pointerEvents: "none",
                color: "#d60a0b",
              },
            };
        }}
      />
    </ReminderModalForm>
  );
}
