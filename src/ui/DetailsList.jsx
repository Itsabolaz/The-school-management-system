function DetailsList({ children }) {
  return (
    <div className="flex items-center gap-x-16 pb-8 text-lg [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-y-5">
      {children}
    </div>
  );
}

function FieldNameList({ fieldNameData }) {
  return (
    <ul>
      {fieldNameData.map((field) => (
        <li key={field}>{field}</li>
      ))}
    </ul>
  );
}

function FieldValueList({ fieldValueData }) {
  return (
    <ul>
      {fieldValueData.map((field) => (
        <li key={field}>{field}</li>
      ))}
    </ul>
  );
}

DetailsList.FieldNameList = FieldNameList;
DetailsList.FieldValueList = FieldValueList;

export default DetailsList;
