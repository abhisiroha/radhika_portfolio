import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Marquee = () => {
    const firstText = useRef(null)
    const secondText = useRef(null)
    let xPercent = 0;
    let direction = -1;

    useEffect ( () => {
        requestAnimationFrame(animation)
    }, [])
    
    const animation = () => {
        if (xPercent <= -100){
            xPercent = 0;
        }
        gsap.set(firstText.current, {xPercent: xPercent})
        gsap.set(secondText.current, {xPercent: xPercent})
        xPercent += 0.03 * direction;
        requestAnimationFrame(animation)
    }

  return (
    <div className="overflow-hidden w-screen">
      <div className="flex py-4 text-nowrap overflow-hidden">
        
            <p ref={firstText} className="text-2xl md:text-4xl font-dream-avenue"> Visual Design 😃 Experience Design 😇 Interface Design 🤩 User Research 😏</p>

            <p ref={secondText} className="text-2xl md:text-4xl font-dream-avenue"> Visual Design 😃 Experience Design 😇 Interface Design 🤩 User Research 😏
            </p>
      </div>
    </div>
  );
};

const animated_list = [
  "Visual Design",
  "Experience Design",
  "Interface Design",
  "User Research", // Fixed typo in "Research"
];

export default Marquee;