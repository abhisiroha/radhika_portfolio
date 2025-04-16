import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

const Carousel = ({ items, autoPlay = false, autoPlayDelay = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideContainerRef = useRef(null);
  const carouselWrapperRef = useRef(null);
  const intervalRef = useRef(null);

  const goToSlide = (index) => {
    const newIndex = (index + items.length) % items.length;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  const goToPrev = () => {
    goToSlide(currentIndex - 1);
  };

  useEffect(() => {
    if (!slideContainerRef.current || !Array.isArray(items) || items.length === 0) {
      return;
    }

    gsap.to(slideContainerRef.current, {
      xPercent: -100 * currentIndex,
      duration: 0.7,
      ease: 'power3.inOut',
    });
  }, [currentIndex, items]);

  // --- AutoPlay Effect ---
  useEffect(() => {
    if (autoPlay && items.length > 1) {
      intervalRef.current = setInterval(goToNext, autoPlayDelay);
      return () => clearInterval(intervalRef.current);
    }
    return () => {};
  }, [autoPlay, autoPlayDelay, currentIndex, items]);

  if (!Array.isArray(items) || items.length === 0) {
    return <div className="text-center p-10">No items to display.</div>;
  }

  return (
    <div ref={carouselWrapperRef} className="relative w-full overflow-hidden group rounded-2xl">
      <div ref={slideContainerRef} className="flex">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="w-full flex-shrink-0"
            aria-hidden={index !== currentIndex}
          >
            {item.content}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 sm:left-4 top-1/2 z-10 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 z-10 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
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

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.node.isRequired,
  })).isRequired,
  autoPlay: PropTypes.bool,          // New prop
  autoPlayDelay: PropTypes.number,   // New prop (milliseconds)
};

export default Carousel;
