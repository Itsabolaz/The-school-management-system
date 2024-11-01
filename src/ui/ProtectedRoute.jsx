import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1.Load the authenticated user
  const { isAuthenticated, isLoading, user } = useUser();

  useEffect(
    function () {
      // Set the title of the website based on user metadata
      document.title =
        user?.user_metadata?.schoolName || "Loading...";

      // 2. if there is No authenticated user, redirect to the /login
      console.log("isLoading: " ,isLoading)
      console.log("is Auth: ", isAuthenticated)
      if (!isLoading && !isAuthenticated) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate, user?.user_metadata?.schoolName],
  );

  // 3.while loading, show a spinner
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );

  // 4. if there Is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;