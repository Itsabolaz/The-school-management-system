import Button from "./Button";
import ButtonSpinner from "./ButtonSpinner";

function ButtonsForm({ isDoing, reset }) {
  return (
    <div className="mt-8 space-x-4">
      <Button
        style="rounded-md bg-primary-red px-12 py-2 uppercase text-white"
        disabled={isDoing}
      >
        {isDoing ? <ButtonSpinner /> : "Save"}
      </Button>
      <Button
        type="reset"
        style="rounded-md bg-primary-blue px-12 py-2 uppercase text-white"
        disabled={isDoing}
        onClick={reset}
      >
        Reset
      </Button>
    </div>
  );
}

export default ButtonsForm;
