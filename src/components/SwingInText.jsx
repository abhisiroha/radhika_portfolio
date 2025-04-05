import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import PropTypes from 'prop-types';

// Register ScrollTrigger with GSAP - This should ideally be done once globally in your app's entry point,
// but including it here ensures the component works standalone.
gsap.registerPlugin(ScrollTrigger);

const SwingInText = ({
  text,
  startX = '-100%', // Starting X position (can be % or px)
  startY = '-50px', // Starting Y position (can be % or px)
  startRotation = -30, // Starting rotation in degrees
  duration = 1.5, // Animation duration in seconds
  ease = 'power3.out', // GSAP ease function
  scrollTriggerConfig = {}, // Allow overriding ScrollTrigger settings
  as: ElementTag = 'h1', // HTML tag for the text (h1, p, div, etc.)
  className = '', // Optional additional CSS classes
  containerClassName = '', // Optional CSS class for the container
}) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Ensure refs are current
    const element = textRef.current;
    const container = containerRef.current;
    if (!element || !container) return;

    // Set initial styles using GSAP (avoids flash of unstyled content)
    // visibility: 'hidden' is often preferred over opacity: 0 for 'from' animations
    // as it prevents the element from briefly occupying space before animating.
    gsap.set(element, {
      x: startX,
      y: startY,
      rotation: startRotation,
      opacity: 0,
      visibility: 'hidden', // Start hidden
    });

    // Default ScrollTrigger configuration
    const defaultScrollTriggerConfig = {
      trigger: container, // Use the container as the trigger
      start: 'top 80%', // Trigger when the top of the container hits 80% down the viewport
      end: 'bottom 20%', // Optional: define an end point
      toggleActions: 'play none none reset', // Play on enter, do nothing on leave/re-enter/re-leave
      // markers: process.env.NODE_ENV === 'development', // Uncomment for debugging locally
      once: true, // Ensure the animation only happens once
      // scrub: false, // Animation plays independently of scroll position once triggered
      ...scrollTriggerConfig, // Merge custom config, overriding defaults if provided
    };

    // Create the GSAP animation timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: defaultScrollTriggerConfig,
      defaults: { duration, ease }, // Apply default duration and ease to tweens in this timeline
    });

    tl.to(element, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      visibility: 'visible', // Make visible as it animates in
    });

    // Cleanup function for when the component unmounts
    return () => {
      // Kill the timeline and ScrollTrigger instance
      // Check if ScrollTrigger instance exists before killing
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill(); // Kill the timeline itself
      // It's good practice to potentially kill specific tweens if needed,
      // but killing the timeline usually handles its child tweens.
    };

  }, [ text, startX, startY, startRotation, duration, ease, scrollTriggerConfig ]); // Rerun effect if props change

  return (
    <div ref={containerRef} className={`swing-in-container ${containerClassName}`} style={{ overflow: 'hidden' /* Prevent clipping issues during animation */ }}>
      <ElementTag ref={textRef} className={`swing-in-text ${className}`} style={{ visibility: 'hidden' /* Keep hidden initially via CSS too */ }}>
        {text}
      </ElementTag>
    </div>
  );
};

// Define prop types for better component usage and documentation
// SwingInText.propTypes = {
//   text: PropTypes.string.isRequired,
//   startX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   startY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   startRotation: PropTypes.number,
//   duration: PropTypes.number,
//   ease: PropTypes.string,
//   scrollTriggerConfig: PropTypes.object,
//   as: PropTypes.elementType,
//   className: PropTypes.string,
//   containerClassName: PropTypes.string,
// };

export default SwingInText;