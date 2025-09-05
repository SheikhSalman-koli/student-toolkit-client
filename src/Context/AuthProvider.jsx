import React from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {

    const test = 'context is working well'

    const allFunc = {
        test
    }

    return (
       <AuthContext value={allFunc}>
         {children}
       </AuthContext>
    );
};

export default AuthProvider;