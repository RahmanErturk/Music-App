import { createContext, useState, useEffect, useRef } from "react";
import songs from "../data.json";

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
  const audioPlayer = useRef();

  const [allSongs] = useState(songs.songs);
  const [data, setData] = useState({});
  const [playlist, setPlaylist] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);

  const [currentSong, setCurrentSong] = useState("");

  const [songImg, setSongImg] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");

  const getData = () => {
    fetch("http://localhost:4000/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(getData, []);

  const toggleLikeSong = () => {
    console.log(data.songs[index]);
    fetch(`http://localhost:4000/api/songs/${data.songs[index].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data.songs[index],
        isLiked: !data.songs[index].isLiked,
      }),
    })
      .then((res) => {
        getData();
        res.json();
      })
      .then((message) => console.log(message));
  };

  const togglePlay = () => {
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleSkipForward = () => {
    if (index >= playlist.length - 1) {
      setIndex(0);
      setIsPlaying(true);
      audioPlayer.current.src = playlist[0].file;
      audioPlayer.current.play();
      setSongImg(playlist[0].image);
      setSongTitle(playlist[0].title);
      setSongArtist(playlist[0].artist);
    } else {
      setIndex(index + 1);
      setIsPlaying(true);
      audioPlayer.current.src = playlist[index + 1].file;
      audioPlayer.current.play();
      setSongImg(playlist[index + 1].image);
      setSongTitle(playlist[index + 1].title);
      setSongArtist(playlist[index + 1].artist);
    }
  };

  const toggleSkipBackward = () => {
    if (index > 0) {
      setIndex(index - 1);
      setIsPlaying(true);
      audioPlayer.current.src = playlist[index - 1].file;
      audioPlayer.current.play();
      setSongImg(playlist[index - 1].image);
      setSongTitle(playlist[index - 1].title);
      setSongArtist(playlist[index - 1].artist);
    } else {
      setIndex(0);
      setIsPlaying(true);
      audioPlayer.current.src = playlist[0].file;
      audioPlayer.current.play();
      setSongImg(playlist[0].image);
      setSongTitle(playlist[0].title);
      setSongArtist(playlist[0].artist);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        allSongs,
        index,
        setIndex,
        songImg,
        songTitle,
        songArtist,
        isPlaying,
        setIsPlaying,
        toggleLikeSong,
        data,
        currentSong,
        setCurrentSong,
        setPlaylist,
        audioPlayer,
        togglePlay,
        toggleSkipForward,
        toggleSkipBackward,
        setSongImg,
        setSongTitle,
        setSongArtist,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;
