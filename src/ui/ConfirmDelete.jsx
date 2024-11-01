import Button from "./Button";

function ConfirmDelete({ resourceName, onConfirm, disabled , onCloseModal }) {
    return (
        <div className="w-[40rem] flex flex-col gap-5">
          <h3 className="text-3xl font-medium">Delete {resourceName}</h3>
          <p className="text-third-gray mb-5 text-lg">
            Are you sure you want to delete this {resourceName} permanently? This
            action cannot be undone.
          </p>
          <div className="flex justify-end gap-5">
            <Button style="rounded-md bg-secendary-gray hover:bg-[#bfbfbf] px-7 py-3 uppercase text-black transition-all" disabled={disabled} onClick={() => onCloseModal?.()}>
              Cancel
            </Button>
            <Button style="rounded-md bg-primary-red hover:bg-[#ef0000] px-7 py-3 uppercase text-white transition-all " disabled={disabled} onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </div>
      );
}

export default ConfirmDelete
