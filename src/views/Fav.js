import { useContext, useEffect } from "react";

import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import MusicPlayer from "../components/MusicPlayer";

import { Container, Row, Col, Button } from "react-bootstrap";

export default function Fav() {
  const {
    allSongs,
    data,
    setPlaylist,
    index,
    setIndex,
    setCurrentSong,
    setSongImg,
    setSongTitle,
    setSongArtist,
  } = useContext(MusicPlayerContext);

  const likedSongsInDb = data.songs
    ? data.songs.filter((s) => s.isLiked === true)
    : [];

  const mappedSongs = likedSongsInDb.map((s) => s.id);

  const likedSongs = allSongs.filter((s) => mappedSongs.includes(s.id));

  const changeCurrentSong = (param) => {
    setPlaylist(likedSongs);
    setIndex(+param);
    setCurrentSong(likedSongs[index].file);
    setSongImg(likedSongs[index].image);
    setSongTitle(likedSongs[index].title);
    setSongArtist(likedSongs[index].artist);
  };

  return (
    <div>
      <Container className="Fav-songs py-5">
        {likedSongs.map((s, i) => {
          return (
            <Row onClick={() => changeCurrentSong(i)} key={i}>
              <Col className="d-flex" style={{ width: "100%" }}>
                <img
                  style={{ width: "60px", height: "60px", marginRight: "20px" }}
                  src={s.image}
                  alt="Album Cover"
                />
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.artist}</p>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>
      <MusicPlayer playlist={likedSongs} />
    </div>
  );
}
