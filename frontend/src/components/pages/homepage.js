import React, { useState, useEffect, createContext } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import axios from "axios";
import AllShops from "./AllShops";
import storeMusic from "../audio/floralLife.mp3";
import "./pages.css";

export const ShopsContext = createContext();

const Homepage = () => {
  const [shops, setShops] = useState([]);
  const [src, setSrc] = useState("");

  const handlePlayMusic = () => {
    setSrc(storeMusic);
  };

  const handleMuteMusic = () => {
    setSrc("");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/home`)
      .then((res) => {
        setShops(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ShopsContext.Provider
        value={{
          shops,
        }}
      >
        <VolumeUpIcon className="homepagePlayMusic" onClick={handlePlayMusic} />
        <VolumeOffIcon
          className="homepageStopMusic"
          onClick={handleMuteMusic}
        />
        <div className="homeContainer">{<AllShops />}</div>
        <iframe
          src={src}
          allow="autoplay"
          id="loginAudio"
          hidden
          title="homepage Sound"
        ></iframe>
      </ShopsContext.Provider>
    </>
  );
};

export default Homepage;
