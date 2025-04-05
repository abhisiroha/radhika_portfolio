import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { gsap } from 'gsap';

// No interfaces needed in JavaScript

const Carousel = ({ items }) => { // Destructure items directly
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideContainerRef = useRef(null); // No generic type needed for useRef
  const carouselWrapperRef = useRef(null);

  // --- Navigation ---
  const goToSlide = (index) => {
    // Clamp index within bounds
    const newIndex = (index + items.length) % items.length;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  const goToPrev = () => {
    goToSlide(currentIndex - 1);
  };

  // --- GSAP Animation ---
  useEffect(() => {
    // Check if ref exists and items is a non-empty array
    if (!slideContainerRef.current || !Array.isArray(items) || items.length === 0) {
        return;
    }


    // Animate the slide container horizontally
    gsap.to(slideContainerRef.current, {
      xPercent: -100 * currentIndex,
      duration: 0.7, // Animation duration in seconds
      ease: 'power3.inOut', // Smooth easing function
    });

  }, [currentIndex, items]); // Re-run animation when index or items change


  // --- Render ---
  if (!Array.isArray(items) || items.length === 0) {
    return <div className="text-center p-10">No items to display.</div>;
  }

  return (
    <div ref={carouselWrapperRef} className="relative w-full overflow-hidden group rounded-2xl">
      {/* Slide Container */}
      <div ref={slideContainerRef} className="flex">
        {items.map((item, index) => (
          <div
            key={item.id} // Assuming items have a unique 'id'
            className="w-full flex-shrink-0" // Each slide takes full width and doesn't shrink
            aria-hidden={index !== currentIndex} // Accessibility: Hide non-visible slides from screen readers
          >
            {/* Content of the slide */}
            {item.content} {/* Assuming items have a 'content' property */}
          </div>
        ))}
      </div>

      {/* Navigation Buttons (Appear on hover/focus within the group) */}
      {items.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrev}
            className="absolute left-2 sm:left-4 top-1/2 z-10 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 z-10 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Optional: Navigation Dots */}
      {/* Same structure as before */}
       
       <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex space-x-2">
           {items.map((_, index) => (
               <button
                   key={index} // Using index as key here is acceptable if items don't change order
                   onClick={() => goToSlide(index)}
                   className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'} hover:bg-white/75 transition-colors`}
                   aria-label={`Go to slide ${index + 1}`}
                   aria-current={currentIndex === index ? 'step' : undefined}
               />
           ))}
       </div>
      
    </div>
  );
};

// --- PropTypes Definition ---
Carousel.propTypes = {
  /**
   * An array of objects, where each object represents a slide.
   * Each object should have a unique 'id' (string or number) and 'content' (React node).
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.node.isRequired, // 'node' means anything renderable by React
  })).isRequired, // Make the 'items' array itself required
};


export default Carousel;