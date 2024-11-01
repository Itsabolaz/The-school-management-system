import { useNavigate } from "react-router-dom";
import TeacherForm from "./TeacherForm";
import { useForm } from "react-hook-form";
import { useCreateTeacher } from "./useCreateTeacher";
import ButtonsForm from "../../ui/ButtonsForm";
import UploadImageForm from "../../ui/UploadImageForm";
import { useUserImage } from "../../hooks/useUserImage";

function AddTeacherForm() {
  const navigate = useNavigate();
  const {userImage , handleFileChange} = useUserImage()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });
  const { isCreating, createTeacher } = useCreateTeacher();

  function onSubmit(data) {
    createTeacher(
      { data, image: data.image[0] },
      {
        onSuccess: () => {
          reset();
          navigate("/all-teachers");
        },
      },
    );
  }

  return (
    <form
      className="register-form space-y-8 rounded bg-white px-8 py-5 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Add new teacher form */}
      <TeacherForm register={register} isDoing={isCreating} errors={errors}>
        <h1 className="mt-4 text-2xl font-medium">Add new Teacher</h1>
      </TeacherForm>

      {/* Upload teacher image */}
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

export default AddTeacherForm;
