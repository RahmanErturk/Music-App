import { createContext, useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
  const audioPlayer = useRef();

  const [data, setData] = useState({});

  const [playlist, setPlaylist] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);

  const [songImg, setSongImg] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  const getData = () => {
    fetch("http://localhost:4000/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(getData, []);

  const toggleLikeSong = () => {
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

  const changeCurrentSong = (playlist, param) => {
    setPlaylist(playlist);
    setIndex(+param);
    audioPlayer.current.src = `${window.location.origin}/${playlist[param].file}`;
    audioPlayer.current.play();
    setIsPlaying(true);
    setSongImg(playlist[param].image);
    setSongTitle(playlist[param].title);
    setSongArtist(playlist[param].artist);
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

  const indexOfSongInDB = data.songs?.findIndex(
    (s) => s?.id === playlist[index]?.id
  );

  return (
    <MusicPlayerContext.Provider
      value={{
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
        setSearchParams,
        searchTerm,
        playlist,
        getData,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;
