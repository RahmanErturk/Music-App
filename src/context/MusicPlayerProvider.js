import { createContext, useState, useEffect } from "react";
import AllSounds from "../components/AllSounds";

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
  const [allSongs, setAllSongs] = useState(AllSounds);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState([]);

  const [songImg, setSongImg] = useState(allSongs[index].image);
  const [songTitle, setSongTitle] = useState(allSongs[index].title);
  const [songArtist, setSongArtist] = useState(allSongs[index].artist);

  useEffect(() => {
    if (localStorage.getItem("likedSongs")) {
      const storedSongs = JSON.parse(localStorage.getItem("likedSongs"));
      setLikedSongs(storedSongs);
    }
  }, []);

  const addToFavSongs = () => {
    if (!allSongs[index].isLiked) {
      setAllSongs([
        ...allSongs,
        {
          ...allSongs.find((e) => e.title === allSongs[index].title),
          isLiked: true,
        },
      ]);
      // allSongs[index] = {
      //   ...allSongs[index],
      //   isLiked: true,
      // };
      setLikedSongs([...likedSongs, allSongs[index]]);
      console.log(allSongs);
      console.log(allSongs[index]);
      console.log(allSongs[index].isLiked);
      localStorage.setItem(
        "likedSongs",
        JSON.stringify([...likedSongs, allSongs[index]])
      );
    }
  };

  const removeFromFavSongs = (song) => {
    allSongs[index] = {
      ...allSongs[index],
      isLiked: false,
    };
    const restSongs = likedSongs.filter((s) => s.title !== song.title);
    setLikedSongs(restSongs);
    localStorage.setItem("likedSongs", JSON.stringify(restSongs));
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        allSongs,
        index,
        setIndex,
        likedSongs,
        setLikedSongs,
        addToFavSongs,
        removeFromFavSongs,
        songImg,
        setSongImg,
        songTitle,
        setSongTitle,
        songArtist,
        setSongArtist,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;
