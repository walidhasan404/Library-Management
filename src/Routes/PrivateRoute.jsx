import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";


const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <LoadingSpinner text="Checking authentication..." />;
    }

    if(user?.email){
        return children;
    }

    return <Navigate state={location.pathname} to="/login" replace></Navigate>
};

export default PrivateRoute;