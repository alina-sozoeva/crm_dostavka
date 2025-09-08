import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, allowedRoles }) => {
  const userToken = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userId)) {
    return <Navigate to="/applications" replace />;
  }

  return children;
};
