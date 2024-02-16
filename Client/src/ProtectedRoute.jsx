import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";


function ProtectedRoute() {
    const { loading, isAuthenticate } = useAuth();
    console.log(loading, isAuthenticate)
    if(loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticate) return <Navigate to= '/login' replace/>
    return <Outlet/>;
    
    
}
export default ProtectedRoute;