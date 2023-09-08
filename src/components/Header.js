import React from 'react'
import { useEffect } from 'react'
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice"

const Header = () => {
  const dispatch =  useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      // An error happened.
      navigate("/error")
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const {uid, email, displayName, photoURL} = user.uid;
            dispatch(addUser({
                uid: uid, 
                email: email,
                displayName: displayName,
                photoURL: photoURL,
            })
        );   
          navigate("/browse")
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/")
        }
      });
}, [])

  return (
    <div className='absolute flex justify-between w-screen z-10 px-8 py-2 bg-gradient-to-b from-black'>
        <img
         className='w-44'
         src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
         alt="logo"
        />
        
      {user && (
        <div className='flex w-40 h-12 mt-3'>
          <img
            className='w-14 h-10 px-2'
            src="https://avatars.githubusercontent.com/u/69064463?v=4"
            alt="usericon"
          />
          <button onClick={handleSignOut} className='px-2 h-10 w-24 bg-gray-300'>Sign out</button>
        </div>
      )}

    </div>
  )
}

export default Header