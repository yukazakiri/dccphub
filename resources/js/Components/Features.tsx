import Bentodemo from '@/Components/bentogrid';
import React from 'react';
export const Features = () => {
  return (

    <div className="bg-black text-white py-[72px] sm:py-24 ">

      <div className="container">
        <h2 className="text-5xl font-bold tracking-tighter text-center sm:text-6xl">Everything you need </h2>
        <div className='max-w-xl mx-auto'>
        <p className="mt-5 text-xl text-center text-white/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, odit in facilis mollitia dolorum rerum.
        </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 mt-32 sm:flex-row">
          <Bentodemo />


        </div>

      </div>


    </div>
  )
}
