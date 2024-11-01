import Spinner from "../../ui/Spinner";
import { useStudent } from "./useStudent";
import { capitalizeFirstLetter, convertDateFormat } from "../../utils/helper";
import UserImage from "../../ui/UserImage";
import { useDeleteStudentAndParents } from "./useDeleteStudentAndParents";
import Empty from "../../ui/Empty";
import DetailsPageButtons from "../../ui/DetailsPageButtons";
import EditStudentForm from "./EditStudentForm";
import DetailsList from "../../ui/DetailsList";
import DetailsHeader from "../../ui/DetailsHeader";
import DetailsContainer from "../../ui/DetailsContainer";

function StudentDetails() {
  const { isDeleting, deleteStudentAndParents } = useDeleteStudentAndParents();
  const { student, isLoading } = useStudent();

  if (isLoading) return <Spinner />;
  if (!student)
    return (
      <Empty style="text-2xl text-center mt-52 font-semibold">
        There is no information about student here.
      </Empty>
    );

  const {
    id: studentId,
    nationalId,
    studentName,
    gender,
    dateOfBirth,
    religion,
    admissionDate,
    bloodGroup,
    grade,
    image,
    studentDescription,
    parents: { id: parentsId, fatherName , address },
  } = student;

  return (
    <DetailsContainer gapStyle="gap-20">
      <UserImage image={image} />
      <div className="w-1/2">
        <DetailsHeader
          userName={studentName}
          description={studentDescription}
          userId={parentsId}
          userType="student"
        />
        <DetailsList>
          <DetailsList.FieldNameList
            fieldNameData={[
              "National ID:",
              "Grade:",
              "Gender:",
              "Father Name:",
              "Date of Birth:",
              "Blood Group" ,
              "Religion:",
              "Addmission Date:",
              "Address:"
            ]}
          />
          <DetailsList.FieldValueList
            fieldValueData={[
              nationalId,
              grade,
              gender,
              capitalizeFirstLetter(fatherName),
              convertDateFormat(dateOfBirth),
              capitalizeFirstLetter(bloodGroup),
              religion,
              convertDateFormat(admissionDate),
              address
            ]}
          />
        </DetailsList>
      </div>

      <DetailsPageButtons
        EditForm={<EditStudentForm />}
        userId={studentId}
        resourceName={`The student and ${gender === "male" ? "his" : "her"} parents`}
        isDeleting={isDeleting}
        deleteUser={deleteStudentAndParents}
      />
    </DetailsContainer>
  );
}

export default StudentDetails;

/*
<div className="flex items-center gap-x-16 pb-8 text-lg [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-y-5">
          <ul>
            <li>National ID:</li>
            <li>Name:</li>
            <li>Gender:</li>
            <li>Father Name:</li>
            <li>Mother Name:</li>
            <li>Date of Birth:</li>
            <li>Religion:</li>
            <li>Father Occupation:</li>
            <li>E-mail:</li>
            <li>Admission Date:</li>
            <li>Grade:</li>
          </ul>
          <ul>
            <li>{nationalId}</li>
            <li>{capitalizeFirstLetter(studentName)}</li>
            <li>{gender}</li>
            <li>{fatherName}</li>
            <li>{motherName}</li>
            <li>
              <span>{convertDateFormat(dateOfBirth)} , </span>
              <span>
                (
                {new Date().getFullYear() - new Date(dateOfBirth).getFullYear()}{" "}
                years old)
              </span>
            </li>
            <li>{religion}</li>
            <li>{fatherOccupation}</li>
            <li>{email}</li>
            <li>{convertDateFormat(admissionDate)}</li>
            <li>{grade}</li>
          </ul>
        </div>
*/
