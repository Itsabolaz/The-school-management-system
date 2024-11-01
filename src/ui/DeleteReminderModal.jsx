import { useEffect, useRef } from "react";
import Button from "./Button";

function DeleteReminderModal({isDeleteModalOpen , onConfirm, isDeleting, onCloseModal }) {
  const container = useRef(null);
  const descInputRef = useRef(null);

  useEffect(
    function () {
      descInputRef.current?.focus();

      function handleKeydown(event) {
        if (
          container.current?.contains(event.target) &&
          event.key === "Enter"
        ) {
          onConfirm();
        }
      }

      window.addEventListener("keydown", handleKeydown);

      return () => window.removeEventListener("keydown", handleKeydown);
    },
    [onConfirm],
  );

  if (!isDeleteModalOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-[400px] max-w-3xl">
          {/*content*/}
          <div
            ref={container}
            tabIndex={0}
            className="relative flex w-full flex-col rounded-lg border-0 bg-white text-black shadow-lg outline-none focus:outline-none"
          >
            {/*header*/}
            <div className="border-blueGray-200 flex items-center justify-between rounded-t border-b border-solid p-5">
              <h3 className="text-2xl font-semibold">Delete Reminder</h3>
              <button
                className="bg-transparent p-1 text-3xl font-semibold text-black outline-none focus:outline-none"
                onClick={() => onCloseModal?.()}
              >
                <span className="block h-6 w-6 text-2xl text-black outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto px-6 py-4">
              <h2>Are you sure you want delete this reminder?</h2>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid p-6">
              <Button
                style="w-[104px] h-9 text-primary-gray font-bold uppercase text-sm mr-1 mb-1 disabled:cursor-not-allowed disabled:select-none"
                // style="text-primary-red font-bold uppercase px-6 py-2 text-sm mr-1 mb-1 disabled:cursor-not-allowed disabled:select-none"
                type="button"
                disabled={isDeleting}
                onClick={() => onCloseModal?.()}
              >
                Cancel
              </Button>
              <Button
                style="w-[180px] h-10 bg-primary-red text-white font-bold uppercase text-sm rounded shadow hover:shadow-xl mr-1 mb-1 disabled:cursor-not-allowed disabled:select-none"
                // style="bg-primary-green text-white font-bold uppercase text-sm px-5 py-[10px] rounded shadow hover:shadow-xl mr-1 mb-1 disabled:cursor-not-allowed disabled:select-none"
                type="button"
                disabled={isDeleting}
                onClick={onConfirm}
              >
                Delete Reminder
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}

export default DeleteReminderModal;
