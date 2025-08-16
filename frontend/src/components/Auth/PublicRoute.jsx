import { Navigate } from "react-router-dom";

export default function PublicRoute({children}){
    const savedUser = localStorage.getItem("user");
    console.log("PublicRoute", savedUser);
    if(savedUser){
        return <Navigate to="/dashboard" replace />;
    }
    return children;
}