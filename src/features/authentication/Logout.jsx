import { IoLogOutOutline } from "react-icons/io5";
import Modal from "../../ui/Modal";
import ConfirmLogout from "../../ui/ConfirmLogout";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isLoggingOut } = useLogout();
  return (
    <Modal>
      <Modal.Open opens="delete">
        <IoLogOutOutline
          className="h-auto w-11 cursor-pointer rounded-full p-2 transition-all text-primary-red hover:bg-fourth-gray"
          title="Log out!"
        />
      </Modal.Open>
      <Modal.Window name="delete">
        <ConfirmLogout onConfirm={logout} disabled={isLoggingOut} />
      </Modal.Window>
    </Modal>
  );
}

export default Logout;
