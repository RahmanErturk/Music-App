import { useContext, useEffect } from "react";

import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { Container, Row, Col } from "react-bootstrap";

export default function Fav() {
  const { allSongs, data, changeCurrentSong, setPlaylist } =
    useContext(MusicPlayerContext);

  const likedSongsInDb = data.songs
    ? data.songs.filter((s) => s.isLiked === true)
    : [];

  const mappedSongs = likedSongsInDb.map((s) => s.id);

  const likedSongs = allSongs.filter((s) => mappedSongs.includes(s.id));

  useEffect(() => {
    setPlaylist(likedSongs);
  }, []);

  return (
    <div className="Fav-songs">
      <Container>
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
    </div>
  );
}
