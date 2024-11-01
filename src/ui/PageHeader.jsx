import { HiMiniChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

function PageHeader({ pageName, pagePath }) {
  return (
    <div className="space-y-3 py-10">
      <h1 className="w-10 border-b-4 border-primary-red text-xl font-semibold">
        {pageName}
      </h1>
      <p className="flex items-center space-x-2 text-sm">
        <Link to="/dashboard" className="text-primary-gray">
          Home
        </Link>
        {pagePath !== "dashboard" && (
          <>
            <HiMiniChevronRight className="font-medium text-primary-red" />
            <span className="font-semibold text-primary-red">{pagePath}</span>
          </>
        )}
      </p>
    </div>
  );
}

export default PageHeader;
