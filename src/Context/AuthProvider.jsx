import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Components/firebase/firebase_init';


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})
  // console.log(user);

  const provider = new GoogleAuthProvider()

  const googleLogin = () => {
    return signInWithPopup(auth, provider)
  }

  const logout =()=>{
    return signOut(auth)
  }

  useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth, (currentUSer)=>{
        setUser(currentUSer)
     })

     return ()=> unsubscribe()
  },[])


  const allFunc = {
    googleLogin,
    user,
    logout,
  }

  return (
    <AuthContext value={allFunc}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;