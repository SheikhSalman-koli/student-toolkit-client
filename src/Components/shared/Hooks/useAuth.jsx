import React, { use } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

const useAuth = () => {

    const useAuth = use(AuthContext)

    return useAuth
};

export default useAuth;