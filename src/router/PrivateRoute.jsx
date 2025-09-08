import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, allowedRoles }) => {
  const userToken = useSelector((state) => state.user.token);
  const userRole = useSelector((state) => state.user.role);

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/no-access" replace />;
  }

  return children;
};
