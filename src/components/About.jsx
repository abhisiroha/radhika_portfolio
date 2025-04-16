import { BentoCard, BentoTilt } from "./Bento";
// import { TiLocationArrow } from "react-icons/ti";
import { AnimatedTiles } from "./AnimatedTiles";
import Carousel from "./Carousel";
import SongItem from "./SongItem";

const carouselItems = [
  {
    id: 1,
    content: (
      <div className="flex h-64 sm:h-80 justify-center items-center">
        <img src="images/me.webp" className="h-full "/>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex h-64 sm:h-80 justify-center items-center">
        <img src="images/paint.webp" className="h-full "/>
      </div>
    ),
  },
  {
    id: 3,
    content: (
       <div className="flex h-64 sm:h-80 justify-center items-center">
        <img src="images/fort.webp" className="h-full "/>
      </div>
       
    ),
  },
   {
    id: 4,
    content: (
      <div className="flex h-64 sm:h-80 justify-center items-center">
        <img src="images/wall.webp" className="h-full "/>
      </div>
    ),
  },
];


const About = () => {
  return (
    <div id="about" className=" px-8 md:px-48 pt-25">
      <div className="pb-12">
        <AnimatedTiles title="About" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <BentoTilt className="relative mb-4 w-full md:w-2/3 overflow-hidden rounded-md md:h-[65vh]">
          <div className="flex flex-col bg-website-organge rounded-3xl h-[40vh] md:h-[65vh] gap-8 md:gap-24  p-8">
            <p className="font-satoshi text-xl md:text-3xl/relaxed font-normal text-brown-font">
              Design is about meeting users where they are, anticipating where they’re headed, and using data to guide them there with clarity and intent.
            </p>
            <img src="icons/icon_website.svg" className='size-20 md:size-40' />
          </div>
        </BentoTilt>

        <BentoTilt className="relative mb-4 w-full md:w-1/3 overflow-hidden rounded-md md:h-[65vh]">
        <div className='h-full object-center rounded-3xl' >
        <img src="images/my_photo.webp" className="h-full overflow-hidden object-cover rounded-3xl" />
        </div>

          
          
        </BentoTilt>

      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <BentoTilt className="h-1/2 md:h-92 w-full md:w-4/10 overflow-hidden">
          <div className=" flex flex-col gap-4 size-full w-full bg-website-organge p-6 rounded-3xl">
            <h1 className="relative font-satoshi text-2xl font-bold text-brown-font ">
              Current Favourites
            </h1>
            <SongItem song="Gallan 4" artist="Talwinder" link="https://www.youtube.com/watch?v=ZQBgxRuJQqg&ab_channel=Talwiinder" />
            <SongItem song="Floated by" artist="Peter Cat Recording Co." link="https://www.youtube.com/watch?v=961LpbX4zCU&ab_channel=PeterCatRecordingCo." />
            <SongItem song="Tuyo" artist="Rodrigo Amarante" link="https://www.youtube.com/watch?v=npL0_ZAXg9E&ab_channel=vrijegeluiden" />
            <SongItem song="Electric Indigo" artist="Paper Kites" link="https://www.youtube.com/watch?v=HWF5_wdqQj0&ab_channel=thepaperkitesband" />


          </div>
        </BentoTilt>

        <BentoTilt className="h-1/2 md:h-92 w-full md:w-6/10 overflow-hidden">
          <div className=" flex flex-col gap-4 size-full w-full bg-website-organge p-6 rounded-3xl">
            <h1 className="relative font-satoshi text-2xl font-bold text-brown-font ">
              Life Lately
            </h1>
            <Carousel items={carouselItems} autoPlay={true} autoPlayDelay={3000} />
          </div>
        </BentoTilt>
      </div>
    </div>
  );
};

export default About;
