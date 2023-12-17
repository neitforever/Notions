import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoading, selectUserId } from "../redux/user/selectors";

export default function RequireAuth({ children }) {
  const id = useSelector(selectUserId);
  const loading = useSelector(selectLoading);

  if (loading) {
    return <div>loading</div>;
  }

  if (!id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
