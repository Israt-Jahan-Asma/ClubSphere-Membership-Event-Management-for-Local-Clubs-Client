import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { Navigate } from 'react-router';
import Loading from '../Pages/LoadingPage/Loading';


const PrivetRouter = ({children}) => {
    const{user, loading, roleLoading, userStatus} = useContext(AuthContext)
    if (loading || roleLoading){
    return <Loading></Loading>
}
    if (!user || !userStatus == 'active'){
    return <Navigate to={'/login'}></Navigate>
}
    return children
};

export default PrivetRouter;