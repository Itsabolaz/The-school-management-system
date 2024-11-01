import { useForm } from "react-hook-form";
import { useStudent } from "./useStudent";
import Spinner from "../../ui/Spinner";
import { useEditStudent } from "./useEditStudent";
import ButtonsForm from "../../ui/ButtonsForm";
import UploadImageForm from "../../ui/UploadImageForm";
import StudentForm from "./StudentForm";
import { useUserImage } from "../../hooks/useUserImage";

function EditStudentForm({ onCloseModal }) {
  const { student, isLoading } = useStudent();
  const { editStudent, isEditting } = useEditStudent();
  const {userImage , handleFileChange} = useUserImage()

  const studentId = student.id;

  const justStudentInfo = (({
    studentName,
    nationalId,
    gender,
    grade,
    dateOfBirth,
    admissionDate,
    image,
    religion,
    bloodGroup,
    studentDescription,
  }) => ({
    studentName,
    nationalId,
    gender,
    grade,
    dateOfBirth: dateOfBirth.split("T")[0],
    admissionDate: admissionDate.split("T")[0],
    image,
    religion,
    bloodGroup,
    studentDescription,
  }))(student);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: justStudentInfo });

  function onSubmit(data) {
    if (typeof data.image === "string")
      editStudent(
        { studentId, studentObj: data },
        { onSuccess: () => onCloseModal?.() },
      );
    else {
      editStudent(
        { studentId, studentObj: { ...data, image: data.image[0] } },
        { onSuccess: () => onCloseModal?.() },
      );
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      className="register-form w-[70rem] space-y-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StudentForm register={register} isDoing={isEditting} errors={errors}>
        <h1 className="mt-4 text-3xl font-medium">
          Edit student{" "}
          <span className="text-xl">
            (You can only edit the student&#39;s information, not the
            parents&#39;)
          </span>
        </h1>
      </StudentForm>
      <div className="flex items-center gap-x-10">
        <div>
          <div className="h-52 w-52 overflow-hidden rounded-full bg-secendary-gray">
            {typeof justStudentInfo.image === "string" && (
              <img
                src={userImage !== '/default-user.jpg' ? userImage : justStudentInfo.image}
                alt="Student-avatar"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <ButtonsForm isDoing={isEditting} reset={reset} />
        </div>
        <UploadImageForm
          isDoing={isEditting}
          register={register}
          errors={errors}
          isRequired={false}
          handleChangeSrc={handleFileChange}
        />
      </div>
    </form>
  );
}

export default EditStudentForm;
