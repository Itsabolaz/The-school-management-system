import Empty from "./Empty";

function Table({ children, numOfColumns }) {
  const percentWidth = `${(100 / numOfColumns).toFixed(2)}%`;
  const css = `
    tr > th , tr > td {
    width: ${percentWidth}
    }
  `;

  return (
    <>
      <table className="w-full table-fixed divide-y-2 overflow-scroll rounded-md border-2 border-b-2 border-solid border-secendary-gray [&>tbody]:h-16 [&>thead]:h-16">
        {children}
      </table>
      <style>{css}</style>
    </>
  );
}
function Header({ children }) {
  return (
    <thead>
      <tr className='text-primary-red [&>th]:font-semibold'>{children}</tr>
    </thead>
  );
}

function Row({ children }) {
  return (
    <tbody>
      <tr className='text-center'>{children}</tr>
    </tbody>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <>{data.map(render)}</>;
}

function Footer({ children }) {
  return (
    <div>
      <footer className={`${children ? "flex" : "hidden"} justify-center p-5`}>
        {children}
      </footer>
    </div>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
