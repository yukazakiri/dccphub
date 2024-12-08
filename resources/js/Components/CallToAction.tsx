"use client"
import { motion, useScroll, useTransform } from 'framer-motion';
import HelixImage from '/public/images/helix2.png'
import EmojiImage from '/public/images/emojistar.png'
import { useRef } from 'react';
import React from 'react';

export const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const translateY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div className="bg-black text-white py-[72px] sm:py-24" ref={containerRef}>
      <div className="container relative flex flex-col items-center justify-center max-w-xl mx-auto text-center">
        <motion.div style={{translateY}}>
          <img src={HelixImage} alt="helix" className="absolute top-6 left-[calc(100%+36px)]" />
        </motion.div>
        <motion.div style={{translateY}}>
          <img src={EmojiImage} alt="emoji" className="absolute -top-[120px] right-[calc(100%+30px)]" />
        </motion.div>

        <h2 className="text-5xl font-bold tracking-tighter sm:text-6xl">Get Instant Access</h2>
        <p className="mt-5 text-xl text-white/70">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, veritatis? Omnis minima quisquam error accusamus?</p>
        <form className="mt-10 flex flex-col gap-2.5 w-full max-w-sm sm:flex-row">
          <input type="email" placeholder="karthikmudunuri999@gmail.com" className="h-12 bg-white/20 rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] sm:flex-1"/>
          <button className="h-12 px-5 text-black bg-white rounded-lg">Get access</button>
        </form>
      </div>
    </div>
  )
};
