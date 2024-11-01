import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/helper";
import { IoManOutline, IoWomanOutline } from "react-icons/io5";

function DetailsHeader({ userName, description, userId, userType = null }) {
  return (
    <>
      <h1 className="text-3xl font-medium text-primary-blue">
        {/* if user name is equal to parents, we have to show father and mother name (in two separate line) */}
        {userType === "parents" ? (
          <div className="space-y-2 [&>p]:flex [&>p]:items-center [&>p]:gap-2">
            <p>
            <IoManOutline />
              <span className="text-xl font-medium">Father : </span>{" "}
              {capitalizeFirstLetter(userName[0])}
            </p>{" "}
            <p>
              <IoWomanOutline />
              <span className="text-xl font-medium">Mother :</span>{" "}
              {capitalizeFirstLetter(userName[1])}
            </p>
          </div>
        ) : (
          capitalizeFirstLetter(userName)
        )}
      </h1>
      {description && (
        <p className="mt-5 pr-20">
          <span className="text-lg font-normal text-third-gray">{description}</span>
        </p>
      )}

      <div className="my-10 text-primary-blue">
        {userType &&
          (userType === "student" ? (
            <Link to={`/parents/${userId}`}>
              (See this student&apos;s parents&apos; page)
            </Link>
          ) : (
            <Link to={`/all-students/${userId}`}>
              (See this parents&apos; child page)
            </Link>
          ))}
      </div>
    </>
  );
}

export default DetailsHeader;
