import React from 'react'
import { MdMusicNote, MdCallMade  } from "react-icons/md";
import { IconContext } from "react-icons";
// import { useNavigate, BrowserRouter as Router } from 'react-router-dom';

const SongItem = ({song, artist, link}) => {
    const handleClick = () => {
        window.open(link);
      };
    return (
        <div className="flex justify-between">
            <div className="flex flex-row justify-center gap-2">
                <IconContext.Provider value={{ color: "#451c19" }}>
                    <div>
                        <MdMusicNote className="relative size-6 mt-1" />
                    </div>
                </IconContext.Provider>

                <div className="relative flex flex-col">
                    <p className="font-satoshi text-brown-font text-xl">
                        {song}
                    </p>
                    <p className="font-satoshi text-brown-font">
                        {artist}
                    </p>
                </div>
            </div>

            <div onClick={handleClick} className="flex items-start gap-1 cursor-pointer">
                <p className="text-xl text-highlist-organge">Listen</p>
                <IconContext.Provider value={{ color: "#EC5A53" }}>
                    <div>
                        <MdCallMade className="mt-1" />
                    </div>
                </IconContext.Provider>

            </div>

        </div>
    );
}

export default SongItem