import { useForm } from "react-hook-form";
import { useCreateStudentAndParents } from "./useCreateStudentAndParents";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";
import ParentsForm from "../parents/ParentsForm";
import ButtonsForm from "../../ui/ButtonsForm";
import UploadImageForm from "../../ui/UploadImageForm";
import { useUserImage } from "../../hooks/useUserImage";

function AddStudentAndParentsForm() {
  const navigate = useNavigate();
  const {userImage , handleFileChange} = useUserImage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });
  const { isCreating, createStudentAndParents } = useCreateStudentAndParents();

  function onSubmit(data) {
    console.log(data.image[0].size);
    createStudentAndParents(
      { data, image: data.image[0] },
      {
        onSuccess: () => {
          reset();
          navigate("/all-students");
        },
      },
    );
  }

  return (
    <form
      className="register-form space-y-8 rounded bg-white px-8 py-5 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Add new student form */}
      <StudentForm register={register} isDoing={isCreating} errors={errors}>
        <h1 className="mt-4 text-2xl font-medium">Add new students</h1>
      </StudentForm>

      {/* Add new parent form*/}
      <ParentsForm register={register} isCreating={isCreating} errors={errors}>
        <h1 className="mt-4 text-2xl font-medium">Add new Parent</h1>
      </ParentsForm>

      {/* Upload student image */}
      <div className="flex items-center gap-x-10">
        <div>
          {/* <div className="h-72 w-72 rounded-full bg-secendary-gray"></div> */}
          <div className="h-64 w-64 overflow-hidden">
            <img
              src={userImage || "/default-user.jpg"}
              alt="avatar"
              className="h-full w-full rounded-full border-4 border-solid border-white object-cover transition-all"
            />
          </div>
          <ButtonsForm isDoing={isCreating} reset={reset} />
        </div>
        <UploadImageForm
          isDoing={isCreating}
          register={register}
          errors={errors}
          isRequired={true}
          handleChangeSrc={handleFileChange}
        />
      </div>
    </form>
  );
}

export default AddStudentAndParentsForm;
