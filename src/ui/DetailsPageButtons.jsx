import Button from "./Button";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../hooks/useMoveBack";

function DetailsPageButtons({
  EditForm,
  userId = null,
  resourceName = null,
  isDeleting = false,
  deleteUser = () => {},
}) {

  const navigate = useNavigate();
  const moveBack = useMoveBack();
  return (
    <div className="flex flex-col gap-y-5">
      <Button
        style="rounded-md bg-secendary-gray hover:bg-[#bfbfbf] px-8 py-2 uppercase text-black transition-all"
        onClick={moveBack}
      >
        Back
      </Button>
      <Modal>
        <Modal.Open opens="edit">
          <Button
            style="rounded-md bg-secendary-blue hover:bg-primary-blue px-8 py-2 uppercase text-white transition-all"
            onClick={() => navigate(-1)}
          >
            Edit
          </Button>
        </Modal.Open>
        <Modal.Window name="edit">{EditForm}</Modal.Window>
        {userId ? (
          <>
            <Modal.Open opens="delete">
              <Button
                style="rounded-md bg-primary-red hover:bg-[#ef0000] px-8 py-2 uppercase text-white transition-all"
                disabled={isDeleting}
              >
                Delete
              </Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={resourceName}
                onConfirm={() =>
                  deleteUser(userId, { onSuccess: moveBack })
                }
              />
            </Modal.Window>
          </>
        ) : null}
      </Modal>
    </div>
  );
}

export default DetailsPageButtons;
