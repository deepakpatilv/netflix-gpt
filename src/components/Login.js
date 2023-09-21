import React, { useState, useRef } from 'react';
import Header from './Header';
import {checkValidData} from'../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth }  from'../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR, BG_URL } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignInForm]  = useState(true);
    const [errMessage,  setErrMessage] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
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
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value, name.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value,
                    photoURL: USER_AVATAR,
                  }).then(() => {
                    // Profile updated!
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(
                        addUser({
                        uid: uid, 
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );   
                    navigate("/browse");
                    // ...
                  }).catch((error) => {
                    setErrMessage(error.message);
                    // An error occurred
                  });

                // console.log(user);
                navigate("/browse");
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
            <img src={BG_URL} alt="logo" />
        </div>
    
        <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute mx-auto right-0 left-0 my-36 p-12 rounded-lg opacity-90 bg-black'>
            <h1 className="font-bold text-3xl py- 4 text-white">
                {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

            {!isSignInForm && ( 
                <input
                ref={name}
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