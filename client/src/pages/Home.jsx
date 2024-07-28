import React from 'react'
import Post from '../components/Post'

const Home = () => {
  return (
    <div className='w-full gap-7 flex flex-col items-center justify-center my-20'>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
    </div>
  )
}

export default Home