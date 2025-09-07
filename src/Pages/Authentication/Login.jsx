import React from 'react';
import useAuth from '../../Components/shared/Hooks/useAuth'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Login = () => {
 
    const {googleLogin} = useAuth()
    const navigate = useNavigate()

    const handleSocialLogin= async ()=>{
        googleLogin()
        .then(result=>{
            const user = result?.user
            console.log(user);
            navigate('/')
        })
        .catch((error)=>{
            toast.error(error.message)
        })
    }


    return (
        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
             <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <form
        //   onSubmit={handleLogin}
         
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            name='email'
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            name='password'
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
           Login
          </button>
          <p
            className="mt-4 text-sm text-gray-600 text-center cursor-pointer hover:underline"
          >
          Don't have an account? Register
          </p>


        </form>

 <div className="divider">OR</div>
            {/* Google */}
            <button
            onClick={handleSocialLogin}
            className="btn bg-white text-black border-[#e5e5e5] w-full">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>

    </div>



        </div>
    );
};

export default Login;