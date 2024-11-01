import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import ButtonsForm from "../../ui/ButtonsForm";
import ParentsForm from "./ParentsForm";
import { useParents } from "./useParents";
import { useEditParents } from "./useEditParents";

function EditParentsForm({ onCloseModal }) {
  const { parents, isLoading } = useParents();
  const { editParents, isEditting } = useEditParents();

  const parentsId = parents.id;

  const parentsInfo = (({
    fatherName,
    motherName,
    email,
    phoneNumber,
    fatherOccupation,
    address,
    parentsDescription,
  }) => ({
    fatherName,
    motherName,
    email,
    phoneNumber,
    fatherOccupation,
    address,
    parentsDescription,
  }))(parents);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: parentsInfo });

  function onSubmit(data) {
    console.log("parents obj after edit: ", data);
    editParents(
      { parentsObj: data, parentsId },
      { onSuccess: () => onCloseModal?.() },
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      className="register-form w-[70rem] space-y-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ParentsForm register={register} isDoing={isEditting} errors={errors}>
        <h1 className="mt-4 text-3xl font-medium">
          Edit Parnets{" "}
          <span className="text-xl">
            (You can only edit the parents information, not the student)
          </span>
        </h1>
      </ParentsForm>
      <div className="flex items-center gap-x-10">
        <div>
          <ButtonsForm isDoing={isEditting} reset={reset} />
        </div>
      </div>
    </form>
  );
}

export default EditParentsForm;
