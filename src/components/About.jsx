import { BentoCard, BentoTilt } from "./Bento";
import { TiLocationArrow } from "react-icons/ti";

const About = () => (
    <div className="mx-auto px-8 md:px-32">
      <div className="px-5 py-8">
        <p className="text-2xl md:text-4xl font-bold font-noto-sans ">
          About
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-4  w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              Lorem ipsum
            </>
          }
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio corporis quas repellendus sit dolore tempore in, nobis ex temporibus deserunt illo sunt a debitis nulla sint molestiae illum cum excepturi!"
          isComingSoon
        />
      </BentoTilt>

      <div className="grid w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 col-span-2 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                Lorem ipsum
              </>
            }
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio corporis quas repellendus sit dolore tempore in, nobis ex temporibus deserunt illo sunt a debitis nulla sint molestiae illum cum excepturi!"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 col-span-2 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                Lorem ipsum
              </>
            }
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio corporis quas repellendus sit dolore tempore in, nobis ex temporibus deserunt illo sunt a debitis nulla sint molestiae illum cum excepturi!"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 col-span-2 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                Lorem ipsum
              </>
            }
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio corporis quas repellendus sit dolore tempore in, nobis ex temporibus deserunt illo sunt a debitis nulla sint molestiae illum cum excepturi!"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>
      </div>
    </div>
);

export default About;
