import { useState } from "react";
import { ConvertReminderDateFormat } from "../../utils/helper";
import { MdDelete, MdModeEdit } from "react-icons/md";
// import ReminderModal from "../../ui/ReminderModal";
import EditReminder from "./EditReminder";
import DeleteReminder from "./DeleteReminder";

function ReminderRow({ date, dateBgColor, description, reminderId }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div className="pt-5">
      <div className="flex items-center justify-between">
        <h3
          className="flex w-[30%] items-center justify-center rounded-full py-[6px] text-sm text-white"
          style={{ backgroundColor: dateBgColor }}
        >
          {ConvertReminderDateFormat(date)}
        </h3>

        <div className="mr-8 flex gap-5 text-third-gray [&>svg]:h-6 [&>svg]:w-6 [&>svg]:cursor-pointer hover:[&>svg]:text-primary-gray">
          <MdModeEdit onClick={() => setIsEditModalOpen(true)} />
          <EditReminder
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            currentDate={date}
            reminderId={reminderId}
            currentDescription={description}
          />
          <MdDelete onClick={() => setIsDeleteModalOpen(true)} />
          <DeleteReminder
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            reminderId={reminderId}
          />
        </div>
      </div>
      <p className="py-4 pl-2 text-sm font-medium">{description}</p>
    </div>
  );
}

export default ReminderRow;
