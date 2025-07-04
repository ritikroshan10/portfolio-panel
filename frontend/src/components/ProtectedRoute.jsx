// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const email = sessionStorage.getItem("email"); // get saved login email

    if (!email) {
        //  No email means not logged in
        return <Navigate to="/login" replace />;  // redirect to login
    }

    // ✅ Logged in
    return children;
};

export default ProtectedRoute;