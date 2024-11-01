import { useForm } from "react-hook-form";
import { useEditTeacher } from "./useEditTeacher";
import { useTeacher } from "./useTeacher";
import Spinner from "../../ui/Spinner";
import TeacherForm from "./TeacherForm";
import ButtonsForm from "../../ui/ButtonsForm";
import UploadImageForm from "../../ui/UploadImageForm";
import { useUserImage } from "../../hooks/useUserImage";

function EditTeacherForm({ onCloseModal }) {
    const { teacher, isLoading } = useTeacher();
    const { editTeacher, isEditting } = useEditTeacher();
    const {userImage , handleFileChange} = useUserImage()
  
    const teacherId = teacher.id;
  
    const teacherInfo = (({
      fullName,
      nationalId,
      fatherName ,
      gender,
      grade,
      dateOfBirth,
      image,
      religion,
      teacherDescription , 
      email , 
      address,
      phoneNumber
    }) => ({
      fullName,
      nationalId,
      fatherName ,
      gender,
      grade,
      dateOfBirth: dateOfBirth.split("T")[0],
      image,
      religion,
      teacherDescription , 
      email , 
      address,
      phoneNumber
    }))(teacher);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({ defaultValues: teacherInfo });
  
    function onSubmit(data) {
      if (typeof data.image === "string")
        editTeacher(
          { teacherId, teacherObj: data },
          { onSuccess: () => onCloseModal?.() },
        );
      else {
        editTeacher(
          { teacherId, teacherObj: { ...data, image: data.image[0] } },
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
        <TeacherForm register={register} isDoing={isEditting} errors={errors}>
          <h1 className="mt-4 text-3xl font-medium">
            Edit teacher
          </h1>
        </TeacherForm>
        <div className="flex items-center gap-x-10">
          <div>
            <div className="h-52 w-52 overflow-hidden rounded-full bg-secendary-gray">
              {typeof teacherInfo.image === "string" && (
                <img src={userImage !== '/default-user.jpg' ? userImage : teacherInfo.image} alt="Teacher-avatar" className="w-full h-full object-cover" />
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

export default EditTeacherForm
