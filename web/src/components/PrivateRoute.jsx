import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";

const PrivateRoute = ({ element, allowedTypes = [ 1, 2 ] }) => {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedTypes && !allowedTypes.includes(user?.type)) {
    return <Navigate to="/not-found" replace />;
  }

  return element;
};

export default PrivateRoute;
