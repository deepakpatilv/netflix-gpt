import React, { useState, useRef } from 'react';
import Header from './Header';
import {checkValidData} from'../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth}  from'../utils/firebase';

const Login = () => {
    const [isSignInForm, setIsSignInForm]  = useState(true);
    const [errMessage,  setErrMessage] = useState(null)

    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        // Validate the form data
        // console.log(email.current.value, password.current.value);
        const message = checkValidData(email.current.value, password.current.value);
        setErrMessage(message);
        
        if(message) return; 
        
        // Sign Up / Sign In

        if(!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrMessage(errorCode+ " - " +errorMessage);
            });


        } else {
            // Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrMessage(errorCode+ " - " +errorMessage);
            });

        }

    }
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/IN-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="logo" />
        </div>
    
        <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute mx-auto right-0 left-0 my-36 p-12 rounded-lg opacity-90 bg-black'>
            <h1 className="font-bold text-3xl py- 4 text-white">
                {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

            {!isSignInForm && ( 
                <input
                    type="text" 
                    placeholder="Full Name"
                    className="p-2 my-2 w-full text-white bg-gray-700"
                />
            )}
           
            <input
                ref={email}
                type="text" 
                placeholder="Email Address"
                className="p-2 my-2 w-full text-white bg-gray-700"
            />

            <input
                ref={password} 
                type="password"
                placeholder="Password"
                className="p-2 my-2 w-full text-white bg-gray-700"
            />

            <p className='text-red-500 py-3'>{errMessage}</p>
           
            <button className='p-2 my-6 bg-red-700 w-full rounded-sm'
            onClick={handleButtonClick}
            >
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