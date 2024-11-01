import Button from "./Button";

function ConfirmLogout({ onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex w-[40rem] flex-col gap-5">
      <h3 className="text-3xl font-medium">Log out</h3>
      <p className="mb-5 text-lg text-third-gray">
        Are you sure you want to log out?
      </p>

      <div className="flex justify-end gap-5">
        <Button
          style="rounded-md bg-secendary-gray hover:bg-[#bfbfbf] px-7 py-3 uppercase text-black transition-all"
          disabled={disabled}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button
          style="rounded-md bg-primary-red hover:bg-[#ef0000] px-7 py-3 uppercase text-white transition-all "
          disabled={disabled}
          onClick={onConfirm}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}

export default ConfirmLogout;
