import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm]  = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/IN-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="logo" />
        </div>
    
        <form className='w-3/12 absolute mx-auto right-0 left-0 my-36 p-12 rounded-lg opacity-90 bg-black'>
            <h1 className="font-bold text-3xl py- 4 text-white">
                {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

            <input
                type="text" 
                placeholder="Full Name"
                className="p-2 my-2 w-full text-white bg-gray-700"
            />
            {!isSignInForm && ( 
                <input
                    type="text" 
                    placeholder="Email Address"
                    className="p-2 my-2 w-full text-white bg-gray-700"
                />
            )}

            <input 
                type="password"
                placeholder="Password"
                className="p-2 my-2 w-full text-white bg-gray-700"
            />
           
            <button className='p-2 my-6 bg-red-700 w-full rounded-sm'>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </button>

            <p className='py-6 text-white cursor-pointer' onClick={toggleSignInForm}>
                {isSignInForm 
                ? "New to Netflix? Sign up Now"
                : "Alrady registered? Sign In Now..."}
            </p>

        </form>
    
    </div>
  )
}

export default Login;