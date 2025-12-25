import { Navigate, Outlet, useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PrivateRoute({ adminOnly = false }) {
    const location = useLocation();
    const isAuthenticated  = useSelector((state) => state.auth.isAuthenticated);
    const userRoles = useSelector((state) => state.auth.roles);
    if (adminOnly && !userRoles.includes('ADMIN')) {
        return <Navigate to="/" />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login"  state={{ from: location }} replace />;
}

export default PrivateRoute;
