import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const userToken = useSelector((state) => state.user.token);

  if (userToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};
