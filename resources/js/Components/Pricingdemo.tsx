import Bentodemo from '@/Components/bentogrid';
import PricingTable, { PricingTab } from '@/Components/pricing';
import React from 'react';
export const Pricing = () => {
  return (

    <div className="bg-black text-white  bg-gradient-to-b from-black via-[#5D2CA8] to-black py-[72px] sm:py-24 ">

      <div className="container">
        <h2 className="text-5xl font-bold tracking-tighter text-center sm:text-6xl">Choose Your plan</h2>
        <div className='max-w-xl mx-auto'>
        <p className="mt-5 text-xl text-center text-white/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, odit in facilis mollitia dolorum rerum.
        </p>
        </div>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-4 px-24 py-[72px] sm:py-24  ">
          <PricingTable/>


        </div>

      </div>


    </div>
  )
}
