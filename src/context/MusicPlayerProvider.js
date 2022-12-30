import { createContext, useState, useEffect, useRef } from "react";
import songs from "../data.json";

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
  const audioPlayer = useRef();

  const [allSongs] = useState(songs.songs);
  const [data, setData] = useState({});
  const [playlist, setPlaylist] = useState([{ ...allSongs[2] }]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);

  const [songImg, setSongImg] = useState(allSongs[2].image);
  const [songTitle, setSongTitle] = useState(allSongs[2].title);
  const [songArtist, setSongArtist] = useState(allSongs[2].artist);

  const [searchValue, setSearchValue] = useState("");

  const getData = () => {
    fetch("http://localhost:4000/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(getData, []);

  const pathName = window.location.pathname;

  const toggleLikeSong = () => {
    console.log(data.songs[indexOfSongInDB]);
    fetch(`http://localhost:4000/api/songs/${data.songs[indexOfSongInDB].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data.songs[indexOfSongInDB],
        isLiked: !data.songs[indexOfSongInDB].isLiked,
      }),
    })
      .then((res) => {
        getData();
        res.json();
      })
      .then((message) => console.log(message));
  };

  const changeCurrentSong = (param) => {
    setIndex(+param);
    setIsPlaying(true);
    audioPlayer.current.src = "http://localhost:3000/" + playlist[param].file;
    audioPlayer.current.play();
    setSongImg(playlist[param].image);
    setSongTitle(playlist[param].title);
    setSongArtist(playlist[param].artist);
    console.log(audioPlayer);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
    setIsPlaying(!isPlaying);
    console.log(audioPlayer);
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

  const indexOfSongInDB = data.songs
    ? data.songs.findIndex((s) => s.id === playlist[index].id)
    : -1;

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
        setPlaylist,
        audioPlayer,
        togglePlay,
        toggleSkipForward,
        toggleSkipBackward,
        setSongImg,
        setSongTitle,
        setSongArtist,
        changeCurrentSong,
        indexOfSongInDB,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;
