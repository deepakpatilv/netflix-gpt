import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMoviSuggestions from './GptMoviSuggestions'
import { BG_URL } from '../utils/constants'
const GptSearch = () => {
  return (
    <div>
        <div className='absolute -z-10'>
            <img src={BG_URL} alt="logo" />
        </div>
        <GptSearchBar/>
        <GptMoviSuggestions/>
    </div>
  )
}

export default GptSearch