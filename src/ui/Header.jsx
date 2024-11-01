import { Link } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import { useUser } from "../features/authentication/useUser";

function Header() {
  const { user } = useUser();
  const { avatar } = user.user_metadata;
  return (
    <header className="flex h-[12%] items-center justify-end bg-white pr-8 shadow">
      <Link to="/settings">
        <img
          src={avatar || "/default-user.jpg"}
          alt="user-avatar"
          className="w-12 h-12 rounded-full object-cover"
          title="Acount settings"
        />
      </Link>
      <div className="ml-4 mr-3 h-1/3 w-[2.5px] bg-primary-red"></div>
      <Logout />
    </header>
  );
}

export default Header;
