import { useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { Container, Row, Col, Button } from "react-bootstrap";

import AddPlaylistBtn from "./AddPlaylistBtn";

import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/FavoriteSharp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { style } from "@mui/system";

export default function Song({ playlist, album }) {
  const {
    changeCurrentSong,
    isPlaying,
    getData,
    indexOfSongInDB,
    data,
    audioPlayer,
    setIsPlaying,
  } = useContext(MusicPlayerContext);

  const toggleLikeSong = (song) => {
    fetch(`http://localhost:4000/api/songs/${song.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...song,
        isLiked: !song.isLiked,
      }),
    })
      .then((res) => {
        getData();
        res.json();
      })
      .then((message) => console.log(message));
  };

  return playlist?.map((s, i) => {
    return (
      <Row
        onDoubleClick={() => changeCurrentSong(playlist, i)}
        key={i}
        className="songs_container"
      >
        <Col
          className={
            album === "none" ? "songs_overview_home" : "songs_overview_song"
          }
        >
          <div className="songs_item">
            {s.id === data.songs[indexOfSongInDB]?.id && isPlaying ? (
              <PauseIcon
                sx={{ margin: "0", padding: "0", fontSize: "2.3rem" }}
                onClick={() => {
                  setIsPlaying(false);
                  audioPlayer.current.pause();
                }}
              />
            ) : (
              <PlayArrowIcon
                sx={{ margin: "0", padding: "0", fontSize: "2.3rem" }}
                onClick={() => {
                  if (
                    audioPlayer.current.src ===
                    `${window.location.origin}/${s.file}`
                  ) {
                    setIsPlaying(true);
                    audioPlayer.current.play();
                  } else {
                    changeCurrentSong(playlist, i);
                  }
                }}
              />
            )}
          </div>
          <div className="songs_item">
            <p style={{ margin: "0", padding: "0", fontSize: "1.2rem" }}>
              {i + 1}.
            </p>
          </div>
          <div className="songs_item">
            <img
              style={{ margin: "0", padding: "0" }}
              src={s.image}
              alt="Album Cover"
            />
          </div>
          <div className="songs_item">
            <div>
              <h5 style={{ margin: "4px", padding: "0" }}>{s.title}</h5>
              <p style={{ margin: "4px", padding: "0" }}>{s.artist}</p>
            </div>
          </div>
        </Col>
        {album !== "none" ? (
          <Col className="songs_album">
            <p>{s.album}</p>
          </Col>
        ) : null}
        <Col
          className={
            album === "none" ? "songs_home_btn_group" : "songs_btn_group"
          }
        >
          <div>
            <AddPlaylistBtn song={s} />
            {s?.isLiked ? (
              <FilledLikeBtn
                sx={{ margin: "0 1rem" }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLikeSong(s);
                }}
              />
            ) : (
              <LikeBtn
                sx={{ margin: "0 1rem" }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLikeSong(s);
                }}
              />
            )}
          </div>
        </Col>
      </Row>
    );
  });
}
