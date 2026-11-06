import { Navigate } from "react-router-dom"
import useAuth from "../../hooks/user/useAuth"

function ProtectedRoute({ children, roles }) {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/user/login" replace />
    }

    // roles={["vendedor", "admin"]} -> solo esos roles entran
    if (roles && !roles.includes(user?.role)) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute
