import React from 'react'
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

const Button = ({buttonTitle="Check Out"}) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
      const [hoverOpacity, setHoverOpacity] = useState(0);
      const hoverButtonRef = useRef(null);
    
      const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();
    
        setCursorPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      };
    
      const handleMouseEnter = () => setHoverOpacity(1);
      const handleMouseLeave = () => setHoverOpacity(0);
    
      const handleClick = () => {
        window.open("contact", "_blank", "noopener,noreferrer");
      };
  return (
    <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="border-hsla relative flex w-fit cursor-pointer  items-center gap-1 overflow-hidden rounded-full bg-highlist-organge px-4  text-white text-xl h-10"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #850B0588, #ffffff30)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">{buttonTitle}</p>
          </div>
  )
}

export default Button