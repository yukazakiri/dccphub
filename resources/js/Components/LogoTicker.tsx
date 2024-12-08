import { Boxes, Building2, CircleDot, Compass, Hexagon, Triangle } from 'lucide-react';
import React from 'react';

const logos = [
  { icon: Building2, name: "Acme" },
  { icon: Hexagon, name: "Quantum" },
  { icon: Compass, name: "Echo" },
  { icon: CircleDot, name: "Celestial" },
  { icon: Triangle, name: "Pulse" },
  { icon: Boxes, name: "Apex" }
];

export const LogoTicker = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="mb-16 text-lg text-center text-white/70">Trusted by world&apos;s most innovative teams</h2>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll">
            {logos.map((logo, index) => (
              <li key={index} className="flex items-center justify-center w-16 h-16">
                <logo.icon size={32} className="text-white/70" />
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll" aria-hidden="true">
            {logos.map((logo, index) => (
              <li key={index} className="flex items-center justify-center w-16 h-16">
                <logo.icon size={32} className="text-white/70" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
};
