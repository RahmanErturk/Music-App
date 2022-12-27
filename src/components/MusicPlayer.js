import React, { useState, useEffect, useRef, useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";
import { styled, Typography, Slider, Paper, Stack, Box } from "@mui/material";
import AllSounds from "./AllSounds";

// #region ---------------- ICONS ------------------------------
import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/FavoriteSharp";
import PrevBtn from "@mui/icons-material/SkipPrevious";
import PlayBtn from "@mui/icons-material/PlayCircle";
import NextBtn from "@mui/icons-material/SkipNext";
import VolumeBtn from "@mui/icons-material/VolumeUp";
import VolumeOffBtn from "@mui/icons-material/VolumeOff";
import PauseBtn from "@mui/icons-material/PauseCircleFilledSharp";
// #endregion ---------------- ICONS ------------------------------

// #region ---------------- Styled-Componenets ------------------------------
const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#323741",
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  padding: theme.spacing(1),
  boxShadow: "unset",
}));

const PSlider = styled(Slider)(({ theme, ...props }) => ({
  color: "silver",
  height: 3,
  "&:hover": {
    color: "white",
    cursor: "auto",
  },
  "& .MuiSlider-thumb": {
    width: "12px",
    height: "12px",
    display: props.thumbless ? "none" : "block",
  },
}));
// #endregion ---------------- Styled-Componenets ------------------------------

export default function MusicPlayer() {
  const {
    toggleLikeSong,
    songImg,
    songTitle,
    songArtist,
    isPlaying,
    index,
    data,
    currentSong,
    audioPlayer,
    togglePlay,
    toggleSkipForward,
    toggleSkipBackward,
  } = useContext(MusicPlayerContext);

  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);

  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
    }

    if (isPlaying) {
      setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _elapsed = Math.floor(audioPlayer?.current?.currentTime);

        setDuration(_duration);
        setElapsed(_elapsed);
      }, 100);
    }
  }, [volume, isPlaying]);

  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);
      return `${minutes}:${seconds}`;
    }

    return "00:00";
  }

  // #region ---------------- Toggle Buttons ------------------------------

  // #endregion ---------------- Toggle Buttons ------------------------------

  return (
    <div className="mp">
      <audio src={currentSong} ref={audioPlayer} muted={muted} />
      <CustomPaper className="mp-album" sx={{ width: "250px" }}>
        <Stack
          sx={{ padding: "0 10px", width: "90px", height: "70px" }}
          className="mp-album__img"
        >
          <img
            src={songImg}
            alt={songTitle}
            className="mp-album__img"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Stack>
        <Stack
          sx={{ height: "70px" }}
          direction="column"
          className="mp-album__info"
        >
          <h6>{songTitle}</h6>
          <p style={{ fontSize: "0.9rem" }}>{songArtist}</p>
        </Stack>
        <Stack sx={{ padding: "0 10px" }}>
          {data.songs ? (
            data.songs[index].isLiked ? (
              <FilledLikeBtn className="like-btn" onClick={toggleLikeSong} />
            ) : (
              <LikeBtn className="like-btn" onClick={toggleLikeSong} />
            )
          ) : (
            <LikeBtn className="like-btn" onClick={toggleLikeSong} />
          )}
        </Stack>
      </CustomPaper>
      <div className="mp-player">
        <CustomPaper>
          <Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PrevBtn
                sx={{
                  color: "silver",
                  "&:hover": { color: "white" },
                }}
                fontSize={"large"}
                onClick={toggleSkipBackward}
              />
              {isPlaying ? (
                <PauseBtn
                  sx={{
                    color: "silver",
                    "&:hover": { color: "white" },
                    fontSize: "3rem",
                  }}
                  onClick={togglePlay}
                />
              ) : (
                <PlayBtn
                  sx={{
                    color: "silver",
                    "&:hover": { color: "white" },
                    fontSize: "3rem",
                  }}
                  onClick={togglePlay}
                />
              )}

              <NextBtn
                sx={{
                  color: "silver",
                  "&:hover": { color: "white" },
                }}
                fontSize={"large"}
                onClick={toggleSkipForward}
              />
            </Stack>
          </Box>
          <Stack
            spacing={1}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "silver" }}>
              {formatTime(elapsed)}
            </Typography>
            <PSlider thumbless="true" value={elapsed} max={+duration} />
            <Typography sx={{ color: "silver" }}>
              {formatTime(duration - elapsed)}
            </Typography>
          </Stack>
        </CustomPaper>
      </div>
      <div className="mp-soundBtn">
        <CustomPaper>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100px",
                display: "flex",
                alignItems: "center",
                // justifyContent: "flex-start",
              }}
            >
              {muted ? (
                <VolumeOffBtn
                  sx={{
                    color: "silver",
                    "&:hover": { color: "white" },
                  }}
                  onClick={() => {
                    setMuted(!muted);
                  }}
                />
              ) : (
                <VolumeBtn
                  sx={{
                    color: "silver",
                    "&:hover": { color: "white" },
                  }}
                  onClick={() => {
                    setMuted(!muted);
                  }}
                />
              )}

              <PSlider
                min={0}
                max={100}
                value={volume}
                onChange={(e, v) => {
                  setVolume(v);
                }}
              />
            </Stack>
          </Box>
        </CustomPaper>
      </div>
    </div>
  );
}
