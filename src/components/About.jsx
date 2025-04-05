import { BentoCard, BentoTilt } from "./Bento";
// import { TiLocationArrow } from "react-icons/ti";
import { AnimatedTiles } from "./AnimatedTiles";
import Carousel from "./Carousel";
import SongItem from "./SongItem";

const carouselItems = [
  {
    id: 1,
    content: (
      <div className="h-64 sm:h-96 bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white">Slide 1</h2>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="h-64 sm:h-96 bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white">Slide 2</h2>
      </div>
    ),
  },
  {
    id: 3,
    content: (
       // Example with an image
       <div className="h-64 sm:h-96 bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white">Slide 3</h2>
      </div>
       
    ),
  },
   {
    id: 4,
    content: (
      <div className="h-64 sm:h-96 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white">Slide 4</h2>
      </div>
    ),
  },
];


const About = () => (
    <div className=" px-8 md:px-32 pt-8">
      <div className="pb-4">
        <AnimatedTiles title="About"/>
      </div>

      <BentoTilt className="border-hsla relative mb-4  w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              About me
            </>
          }
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio corporis quas repellendus sit dolore tempore in, nobis ex temporibus deserunt illo sunt a debitis nulla sint molestiae illum cum excepturi!"
          isComingSoon
        />
      </BentoTilt>

      <div className="flex flex-col md:flex-row gap-4">
        <BentoTilt className="h-1/2 md:h-full w-full md:w-4/10 overflow-hidden rounded-md">
          <div className=" flex flex-col gap-4 size-full w-full bg-website-organge p-6">
            <h1 className="relative font-satoshi text-2xl font-bold text-brown-font ">
                  Current Favourites
            </h1>
            <SongItem song="Gallan 4" artist="Talwinder" link="https://www.youtube.com/watch?v=ZQBgxRuJQqg&ab_channel=Talwiinder"/>
            <SongItem song="Floated by" artist="Peter Cat Recording Co." link="https://www.youtube.com/watch?v=961LpbX4zCU&ab_channel=PeterCatRecordingCo."/>
            <SongItem song="Tuyo" artist="Rodrigo Amarante" link="https://www.youtube.com/watch?v=npL0_ZAXg9E&ab_channel=vrijegeluiden"/>
            <SongItem song="Electric Indigo" artist="Paper Kites" link="https://www.youtube.com/watch?v=HWF5_wdqQj0&ab_channel=thepaperkitesband"/>
            
            
          </div>
        </BentoTilt>

        <BentoTilt className="h-1/2 md:h-full w-full md:w-6/10 overflow-hidden rounded-md">
        <div className=" flex flex-col gap-4 size-full w-full bg-website-organge p-6">
          <h1 className="relative font-satoshi text-2xl font-bold text-brown-font ">
            Life Lately
          </h1>
          <Carousel items={carouselItems} />
        </div>
        </BentoTilt>
      </div>
    </div>
);

export default About;
