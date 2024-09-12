import React from 'react'
import Lottie from 'react-lottie-player'
import LoadingSVG from "./LoadingSVG.json";

const Loading = () => {
  return (
    <main className='bg-slate-800 z-10 h-screen flex flex-col items-center'>
      <Lottie
        loop
        animationData={LoadingSVG}
        play
        style={{ width: 350, height: 350 }}
      />
    </main>
  )
}

export default Loading
