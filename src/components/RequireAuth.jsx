import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
    const token = useContext(AuthContext).token;

    if (!token) {
        return <Navigate to="/Login" replace />
    }
    return children;
}