import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const token = useSelector((state: RootState) => state.auth.token);
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
