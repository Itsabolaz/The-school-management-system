import {
  cloneElement,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  const value = useMemo(() => ({ openName, close, open }), [openName, open]);

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

function Open({ children, opens: opensName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="bg-[rgba(255, 255, 255, 0.1)] fixed left-0 top-0 z-50 h-screen w-full backdrop-blur-4xl transition-all">
      <div
        ref={ref}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-12 py-8 shadow-lg transition-all"
      >
        <button
          onClick={close}
          className="absolute right-8 top-5 translate-x-3 rounded-sm border-none bg-none p-2 transition-all hover:bg-fourth-gray"
        >
          <HiXMark className="h-10 w-10 text-third-gray" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
