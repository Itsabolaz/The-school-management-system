import DetailsContainer from "../../ui/DetailsContainer";
import DetailsHeader from "../../ui/DetailsHeader";
import DetailsList from "../../ui/DetailsList";
import DetailsPageButtons from "../../ui/DetailsPageButtons";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import UserImage from "../../ui/UserImage";
import { capitalizeFirstLetter, convertDateFormat } from "../../utils/helper";
import EditTeacherForm from "./EditTeacherForm";
import { useDeleteTeacher } from "./useDeleteTeacher";
import { useTeacher } from "./useTeacher";

function TeacherDetails() {
  const { isDeleting, deleteTeacher } = useDeleteTeacher();
  const { teacher, isLoading } = useTeacher();

  if (isLoading) return <Spinner />;
  if (!teacher)
    return (
      <Empty style="text-2xl text-center mt-52 font-semibold">
        There is no information about teacher here.
      </Empty>
    );

  const {
    id: teacherId,
    nationalId,
    fullName,
    gender,
    fatherName,
    grade,
    dateOfBirth,
    religion,
    phoneNumber,
    address,
    email,
    image,
    teacherDescription,
  } = teacher;

  return (
    <DetailsContainer gapStyle="gap-20">
      <UserImage image={image} />
      <div className="w-1/2">
        <DetailsHeader userName={fullName} description={teacherDescription} />
        <DetailsList>
          <DetailsList.FieldNameList
            fieldNameData={[
              "National ID:",
              "fullName:",
              "Gender:",
              "Father Name:",
              "Grade:",
              "Date of Birth:",
              "Religion:",
              "Phone number:",
              "Address:",
              "E-mail:",
            ]}
          />
          <DetailsList.FieldValueList
            fieldValueData={[
              nationalId,
              capitalizeFirstLetter(fullName),
              gender,
              capitalizeFirstLetter(fatherName),
              grade,
              convertDateFormat(dateOfBirth),
              religion,
              phoneNumber,
              address,
              email,
            ]}
          />
        </DetailsList>
      </div>

      <DetailsPageButtons
        EditForm={<EditTeacherForm />}
        userId={teacherId}
        resourceName='The Teacher'
        isDeleting={isDeleting}
        deleteUser={deleteTeacher}
      />
    </DetailsContainer>
  );
}

export default TeacherDetails;
