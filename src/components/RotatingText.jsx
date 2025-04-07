"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react"; // Recommended for React integration

// Helper function for class names (remains the same)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Register useGSAP plugin if using it
gsap.registerPlugin(useGSAP);

const RotatingText = forwardRef((props, ref) => {
  const {
    texts = ["Default Text 1", "Default Text 2"], // Provide default texts
    // --- GSAP Specific Animation Props ---
    duration = 0.8, // Animation duration in seconds
    ease = "power2.inOut", // GSAP ease function (e.g., "elastic.out(1, 0.5)", "bounce.out", "expo.inOut")
    // GSAP equivalent of Framer Motion's initial/animate/exit states
    fromVars = { y: "100%", opacity: 0 }, // Animation starting state
    toVars = { y: 0, opacity: 1 }, // Animation ending state
    exitVars = { y: "-120%", opacity: 0 }, // State to animate *to* before changing text (can be complex to implement perfectly without AnimatePresence)
    // --- Staggering Props ---
    staggerDuration = 0.05, // Time between the start of each element's animation
    staggerFrom = "first", // "first", "last", "center", "random", or an index (number)
    // --- Component Logic Props ---
    splitBy = "characters", // "characters", "words", "lines", or a custom string separator
    rotationInterval = 2000, // Time (ms) between automatic text rotations
    loop = true, // Whether to loop back to the first text after the last
    auto = true, // Whether to rotate automatically
    onNext, // Callback function when the text index changes
    // --- Styling Props ---
    mainClassName, // Class for the main container span
    splitLevelClassName, // Class for the wrapper around each split unit (word/line)
    elementLevelClassName, // Class for each animated element (character/word/line)
    ...rest // Pass down any other props to the main container span
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const containerRef = useRef(null); // Ref for the main container
  const textWrapperRef = useRef(null); // Ref for the div wrapping the animated elements

  // --- Text Splitting Logic (mostly unchanged) ---
  const splitIntoCharacters = (text) => {
    // Use Intl.Segmenter if available for better grapheme splitting (handles complex characters/emojis)
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    // Fallback to simple Array.from
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex] || ""; // Handle potential undefined text
    if (!currentText) return []; // Return empty array if no text

    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        content: splitIntoCharacters(word), // Changed 'characters' to 'content' for clarity
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        content: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        content: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }
    // For a custom separator
    return currentText.split(splitBy).map((part, i, arr) => ({
      content: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  // --- GSAP Animation ---
  useGSAP(
    () => {
      if (!textWrapperRef.current) return;

      // Select all the individual elements to be animated
      const animElements = gsap.utils.toArray(
        textWrapperRef.current.querySelectorAll(".rotating-text-element")
      );

      if (animElements.length === 0) return; // No elements to animate

      // --- Stagger Configuration ---
      // Map staggerFrom prop to GSAP's 'from' parameter
      let staggerFromMapped = staggerFrom;
      if (staggerFrom === "first") staggerFromMapped = "start";
      else if (staggerFrom === "last") staggerFromMapped = "end";
      // 'center' and 'random' are directly supported by GSAP
      // Numerical index is also supported

      const staggerConfig = {
        each: staggerDuration,
        from: staggerFromMapped,
      };

      // --- Animation ---
      // Animate the elements from 'fromVars' to 'toVars'
      gsap.fromTo(
        animElements,
        { ...fromVars }, // Start state
        {
          ...toVars, // End state
          duration: duration,
          ease: ease,
          stagger: staggerConfig,
          // Overwrite ensures new animations override any lingering ones on the same elements
          overwrite: "auto",
        }
      );

      // NOTE: Replicating the exact 'exit' animation of Framer Motion's AnimatePresence
      // is more complex with GSAP in React without extra state management.
      // This implementation focuses on the enter animation ('fromVars' to 'toVars').
      // A full exit animation would require animating the *outgoing* elements *before*
      // the state update removes them, which often involves temporary cloning or more complex state.
      // You could potentially add a gsap.to(animElements, {...exitVars, ...}) call *before*
      // the state update in the `handleIndexChange` function, but coordinating it with React's
      // render cycle can be tricky.

    },
    { dependencies: [currentTextIndex, elements, duration, ease, fromVars, toVars, staggerDuration, staggerFrom], scope: containerRef } // Re-run animation when these change
  );

  // --- Control Functions (mostly unchanged) ---
  const handleIndexChange = useCallback(
    (newIndex) => {
      // Basic validation
       if (newIndex < 0 || newIndex >= texts.length) {
         console.warn(`RotatingText: Invalid index ${newIndex}`);
         return;
       }
      if (newIndex !== currentTextIndex) {
        setCurrentTextIndex(newIndex);
        if (onNext) onNext(newIndex);
      }
    },
    [currentTextIndex, texts.length, onNext] // Added texts.length dependency
  );

  const next = useCallback(() => {
    const nextIndex = (currentTextIndex + 1) % texts.length;
    if (!loop && currentTextIndex === texts.length - 1) {
      return; // Stop if not looping and at the end
    }
    handleIndexChange(nextIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex = (currentTextIndex - 1 + texts.length) % texts.length;
     if (!loop && currentTextIndex === 0) {
       return; // Stop if not looping and at the beginning
     }
    handleIndexChange(prevIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      handleIndexChange(validIndex);
    },
    [texts.length, handleIndexChange] // Removed currentTextIndex dependency, already handled in handleIndexChange
  );

  const reset = useCallback(() => {
    handleIndexChange(0);
  }, [handleIndexChange]);

  // Expose controls via ref (unchanged)
  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
      currentIndex: currentTextIndex, // Optionally expose current index
    }),
    [next, previous, jumpTo, reset, currentTextIndex]
  );

  // Automatic rotation interval (unchanged)
  useEffect(() => {
    if (!auto || texts.length <= 1) return; // Don't run if auto is false or only one text

    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId); // Cleanup interval on unmount or dependency change
  }, [next, rotationInterval, auto, texts.length]); // Added texts.length dependency

  // --- Rendering ---
  return (
    <span
      ref={containerRef} // Add ref to the main container
      className={cn(
        "rotating-text-container inline-flex flex-wrap whitespace-pre-wrap relative overflow-hidden", // Added overflow-hidden potentially
        mainClassName
      )}
      {...rest}
    >
      {/* Screen-reader only text (unchanged) */}
      <span className="sr-only">{texts[currentTextIndex]}</span>

      {/* Visible text wrapper - use standard div, add ref */}
      <div
        ref={textWrapperRef}
        key={currentTextIndex} // Key change triggers re-render, important for useGSAP dependency change
        className={cn(
          "rotating-text-wrapper",
          splitBy === "lines"
            ? "flex flex-col w-full" // Specific styling for lines
            : "inline-flex flex-wrap whitespace-pre-wrap relative" // Default styling
        )}
        aria-hidden="true"
      >
        {elements.map((unit, unitIndex) => (
          // Wrapper for each word/line/part (split level)
          <span
            key={unitIndex}
            className={cn("rotating-text-split-unit inline-flex", splitLevelClassName)}
          >
            {/* Individual animatable elements (characters/words/lines) */}
            {unit.content.map((element, elementIndex) => (
              <span
                key={elementIndex}
                className={cn("rotating-text-element inline-block", elementLevelClassName)}
                style={{ opacity: 0 }} // Start invisible before GSAP takes over (optional, GSAP's 'from' handles this)
              >
                {element}
              </span>
            ))}
            {/* Add space if needed */}
            {unit.needsSpace && <span className="whitespace-pre"> </span>}
          </span>
        ))}
      </div>
    </span>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;