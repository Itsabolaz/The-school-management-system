import {
  useState,
  useMemo,
  useContext,
  cloneElement,
  createContext,
} from "react";

export const ReminderContext = createContext();

function ReminderModal({ children }) {
  const [openName, setOpenName] = useState("");
  //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const contextValue = useMemo(
    () => ({
      openName,
      setOpenName,
      selectedDate,
      setSelectedDate,
    }),
    [openName, selectedDate],
  );

  return (
    <ReminderContext.Provider value={contextValue}>
      {children}
    </ReminderContext.Provider>
  );
}

export function Open({ children, opens }) {
  const { setOpenName } = useContext(ReminderContext);

  if (opens === "create") {
    return cloneElement(children);
  } else {
    return cloneElement(children, { onClick: () => setOpenName(opens) });
  }
}

export function Window({ children, opens }) {
  const { openName } = useContext(ReminderContext);

  if (openName !== opens) return null;

  return children;
}

ReminderModal.Open = Open;
ReminderModal.Window = Window;

export default ReminderModal;