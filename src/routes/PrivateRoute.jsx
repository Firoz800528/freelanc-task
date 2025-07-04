import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loadingAuth } = useContext(AuthContext);
  const location = useLocation();

  if (loadingAuth) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
