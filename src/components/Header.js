import React from 'react'
import { useEffect } from 'react'
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR, SUPPORTED_LANGUAGES} from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice"
import { chanegLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch =  useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      // An error happened.
      navigate("/error")
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
      // UnSubscribe when component un-mounts
      return() => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
      //  Toggle GPT Search
      dispatch(toggleGptSearchView());
  }

  const handleLanguageChange =(e) => {
    // console.log(e.target.value);
    dispatch(chanegLanguage(e.target.value))
  }

  return (
    <div className='absolute flex justify-between w-screen z-10 px-8 py-2 bg-gradient-to-b from-black'>
      <img className='w-44' src={LOGO} alt="logo"/>
        
      {user && (
        <div className='flex w-100 h-12 mt-3'>
          {showGptSearch && (
            <select className='p-1 bg-gray-900 text-white' 
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map(lang => 
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              )}
            </select>
          )}

          <button className='py-1 px-4 m-2 bg-purple-800 text-white rounded-lg'
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page": "GPT Search"}
          </button>
          <img
            className='w-14 h-10 px-2'
            src={USER_AVATAR}
            alt="usericon"
          />

          <button onClick={handleSignOut} className='px-2 h-10 w-24 bg-gray-300'>Sign out</button>

        </div>
      )}

    </div>
  )
}

export default Header