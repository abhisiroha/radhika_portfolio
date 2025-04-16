import React from 'react'
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

const Button = ({buttonTitle="Check Out", href=""}) => {
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
        if (href) {
            let targetUrl = href; // Start with the original href
    
            // Check if the href *doesn't* start with 'http://' or 'https://' (case-insensitive)
            if (!/^https?:\/\//i.test(href)) {
                // If it doesn't look like an absolute URL, prepend 'https://'
                // This assumes you want HTTPS, which is standard practice.
                targetUrl = `https://${href}`;
                console.log(`Prepending 'https://' to relative href. Opening: ${targetUrl}`); // Optional: for debugging
            }
    
            // Use the (potentially modified) targetUrl
            window.open(targetUrl, "_blank", "noopener,noreferrer");
        }
        
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