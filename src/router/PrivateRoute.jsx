import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const userToken = useSelector((state) => state.user.token);

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
