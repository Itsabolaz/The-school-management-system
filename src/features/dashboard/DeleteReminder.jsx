import { useDeleteReminder } from "./useDeleteReminder";
import DeleteReminderModal from "../../ui/DeleteReminderModal";

export default function DeleteReminder({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  reminderId,
}) {
  const { deleteReminder, isDeleting } = useDeleteReminder();

  function handleDeleteReminder() {
    deleteReminder(reminderId);
  }

  function handleCloseModal() {
    setIsDeleteModalOpen(false);
  }

  if (!isDeleteModalOpen) return null;
  return (
    <DeleteReminderModal
      isDeleteModalOpen={isDeleteModalOpen}
      onConfirm={handleDeleteReminder}
      isDeleting={isDeleting}
      onCloseModal={handleCloseModal}
    />
  );
}
