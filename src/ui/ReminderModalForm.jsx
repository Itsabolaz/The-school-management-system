import { useEffect, useRef } from "react";
import Button from "./Button";

export default function ReminderModalForm({
  children,
  onSubmitReminder,
  isDoing,
  modalTitle,
  onCloseModal,
  descInputRef
}) {
  const container = useRef(null);

  useEffect(
    function () {
      descInputRef.current?.focus();

      function handleKeydown(event) {
        if (
          container.current?.contains(event.target) &&
          event.key === "Enter"
        ) {
          onSubmitReminder();
        }
      }

      window.addEventListener("keydown", handleKeydown);

      return () => window.removeEventListener("keydown", handleKeydown);
    },
    [onSubmitReminder , descInputRef],
  );

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
              <h3 className="text-2xl font-semibold">{modalTitle}</h3>
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
              <div className="text-blueGray-500 flex flex-col gap-6 leading-relaxed">
                {children}
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid p-6">
              <Button
                style="w-[104px] h-9 text-primary-red font-bold uppercase text-sm mr-1 mb-1 disabled:cursor-not-allowed disabled:select-none"
                type="button"
                disabled={isDoing}
                onClick={() => onCloseModal?.()}
              >
                Cancel
              </Button>
              <Button
                style="w-[180px] h-10 bg-primary-green text-white font-bold uppercase text-sm rounded shadow hover:shadow-xl mr-1 mb-1 disabled:cursor-not-allowed disabled:select-none"
                type="button"
                disabled={isDoing}
                onClick={onSubmitReminder}
              >
                {modalTitle}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );

  // return (
  //   <>
  //     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
  //       <div className="relative mx-auto my-6 w-[400px] max-w-3xl">
  //         {/*content*/}
  //         <div
  //           ref={container}
  //           tabIndex={0}
  //           className="relative flex w-full flex-col rounded-lg border-0 bg-white text-black shadow-lg outline-none focus:outline-none"
  //         >
  //           {/*header*/}
  //           <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
  //             <h3 className="text-2xl font-semibold">{modalTitle}</h3>
  //             <button
  //               className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
  //               onClick={() => setIsModalOpen(false)}
  //             >
  //               <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
  //                 ×
  //               </span>
  //             </button>
  //           </div>
  //           {/*body*/}
  //           <div className="relative flex-auto px-6 py-4">
  //             <div className="text-blueGray-500 flex flex-col gap-6 leading-relaxed">
  //               <input
  //                 type="text"
  //                 placeholder="Enter reminder title or desc."
  //                 ref={descInputRef}
  //                 value={descriptionInput}
  //                 onChange={(e) => setDescriptionInput(e.target.value)}
  //                 className="text-lg"
  //               />
  //               {modalTitle === "Add New Reminder" ? (
  //                 <span className="text-base">
  //                   Date selected :{" "}
  //                   {ConvertReminderDateFormat(new Date(date))}
  //                 </span>
  //               ) : (
  //                 <input
  //                   type="date"
  //                   value={
  //                     new Date(date).toISOString().split("T")[0]
  //                   }
  //                   onChange={(e) => setDate(e.target.value)}
  //                 />
  //               )}
  //             </div>
  //           </div>
  //           {/*footer*/}
  //           <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
  //             <Button
  //               // style="text-primary-red background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
  //               style="text-primary-red font-bold uppercase px-6 py-2 text-sm mr-1 mb-1 disabled:cursor-not-allowed disabled:select-none"
  //               type="button"
  //               disabled={isDoing}
  //               onClick={() => setIsModalOpen(false)}
  //             >
  //               Cancel
  //             </Button>
  //             <Button
  //               // style="bg-primary-green text-white active:bg-emerald-600 font-bold uppercase text-sm px-5 py-[10px] rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
  //               style="bg-primary-green text-white font-bold uppercase text-sm px-5 py-[10px] rounded shadow hover:shadow-xl mr-1 mb-1 disabled:cursor-not-allowed disabled:select-none"
  //               type="button"
  //               disabled={isDoing}
  //               onClick={onSubmitReminder}
  //             >
  //               {modalTitle}
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
  //   </>
  // );
}