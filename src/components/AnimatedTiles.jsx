import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export const AnimatedTiles = ({title, textClass}) => {

  const container = useRef(null)

  useGSAP( () =>{
    const ctx = gsap.context(()=> {
      const tl= gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play none none reverse",
          // scrub: 0.25
          // markers:true
          },
      })
      tl.fromTo(container.current,
        {
        transform: "translate3d(100px, 51px, -60px) rotateY(60deg) rotateX(-40deg)",
        opacity: 0,
        transformOrigin: "100% 50% -150px",

        },
        {
        ease:'power2.inOut',
        transform: "translate3d(0px, 0px, 0px) rotateY(0deg) rotateX(0deg)",
        opacity: 1,
        },
       );
    }, container);
    return () => ctx.revert();
  }, []);
  return (
    <div  className='relative flex font-satoshi'>
        <h1 ref={container} className='text-5xl'>
            {title}
          </h1>
      </div>
  )
}
