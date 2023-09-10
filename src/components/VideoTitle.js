import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[17%] px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/4'>{overview}</p>
        <div>
            <button className='bg-white p-4 px-12 textlg text-black rounded-lg hover:bg-opacity-80'> &#9654; Play</button>
            <button className='mx-2 bg-gray-500 p-4 px-12 textlg text-white bg-opacity-50 rounded-lg'>❕ More Info</button>
        </div>
    </div>
  )
};

export default VideoTitle