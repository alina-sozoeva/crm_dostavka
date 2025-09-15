import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, allowedRoles }) => {
  const userToken = useSelector((state) => state.user.token);
  const userPos = useSelector((state) => state.user.userPos);

  if (!userToken) return <Navigate to="/login" replace />;

  if (allowedRoles && !userPos) return null;

  if (allowedRoles && !allowedRoles.map(Number).includes(Number(userPos))) {
    return <Navigate to="/applications" replace />;
  }

  return children;
};
