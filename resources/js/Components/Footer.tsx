import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import React from 'react';

export const Footer = () => {
  return(
    <footer className='py-5 bg-black border-t text-white/60 border-white/20'>
    <div className="container">
      <div className='flex flex-col gap-5 sm:flex-row sm:justify-between'>
        <div className="text-center"> 2024 Eldora UI All rights are reserved</div>
        <ul className='flex justify-center gap-2.5'>
          <li><Twitter size={20} /></li>
          <li><Linkedin size={20} /></li>
          <li><Instagram size={20} /></li>
          <li><Youtube size={20} /></li>
        </ul>
      </div>
    </div>
    </footer>
  )
};
