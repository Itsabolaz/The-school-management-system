import DetailsContainer from "../../ui/DetailsContainer";
import DetailsHeader from "../../ui/DetailsHeader";
import DetailsList from "../../ui/DetailsList";
import DetailsPageButtons from "../../ui/DetailsPageButtons";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { capitalizeFirstLetter } from "../../utils/helper";
import EditStudentForm from "../students/EditStudentForm";
import EditParentsForm from "./EditParentsForm";
import { useParents } from "./useParents";

function ParentsDetails() {
  const { parents, isLoading } = useParents();

  if (isLoading) return <Spinner />;

  if (!parents)
    return (
      <Empty style="text-2xl text-center mt-52 font-semibold">
        There is no information about parents here.
      </Empty>
    );

  const {
    fatherName,
    motherName,
    fatherOccupation,
    parentsDescription,
    phoneNumber,
    email,
    address,
    students: { id: studentId, studentName },
  } = parents;

  return (
    <DetailsContainer gapStyle='gap-36'>
      <div className="w-1/2 gap">
        <DetailsHeader
          userName={[fatherName , motherName]}
          description={parentsDescription}
          userId={studentId}
          userType="parents"
        />
        <DetailsList>
          <DetailsList.FieldNameList
            fieldNameData={[
              "Student Name:",
              "Father Occupation:",
              "Phone Number:",
              "E-mail:",
              "Address:",
            ]}
          />
          <DetailsList.FieldValueList
            fieldValueData={[
              capitalizeFirstLetter(studentName),
              fatherOccupation,
              phoneNumber,
              email,
              address,
            ]}
          />
        </DetailsList>
      </div>

      <DetailsPageButtons EditForm={<EditParentsForm />} />
    </DetailsContainer>
  );
}

export default ParentsDetails;
