import { useState, useRef, useEffect } from "react";
import Button from "./Button";

export const BentoTilt = ({ children, className = ""}) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({title, description , link="https://medium.com/design-bootcamp/boosting-adoption-rate-by-35-a-ux-case-study-on-milestone-driven-rewards-for-kirana-stores-febb58e7c540", buttonText="Case Study", vidLink="videos/app_new.mp4"}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.3, // 30% of the video must be visible
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative size-full rounded-3xl overflow-hidden">
      <video ref={videoRef} src={vidLink} className="absolute z-0 h-full w-full object-cover " autoPlay muted loop playsInline></video>
      <div className="relative z-30 flex size-full flex-col justify-between p-5">
        <div>
          <h1 className="bento-title">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
        <Button buttonTitle={buttonText} href={link} />
      </div>
    </div>
  );
};

export const BentoCardImage = ({title, description , link="https://medium.com/design-bootcamp/boosting-adoption-rate-by-35-a-ux-case-study-on-milestone-driven-rewards-for-kirana-stores-febb58e7c540", buttonText="Case Study", vidLink="videos/app_new.mp4"}) => {

  return (
    <div className="relative size-full rounded-3xl overflow-hidden">
      <img src={vidLink} className="absolute z-0 h-full w-full object-cover "></img>
      <div className="relative z-30 flex size-full flex-col justify-between p-5">
        <div>
          <h1 className="bento-title">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
        <Button buttonTitle={buttonText} href={link} />
      </div>
    </div>
  );
};