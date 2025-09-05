import React from 'react';
import useAuth from '../../Components/shared/Hooks/useAuth';

const Login = () => {
    const{test} = useAuth()
    console.log(test);
 
    return (
        <div>
            login
        </div>
    );
};

export default Login;