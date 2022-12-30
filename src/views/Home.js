import { useContext, useEffect } from "react";

import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { Link } from "react-router-dom";

import songs from "../data.json";

import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  const { changeCurrentSong, setPlaylist } = useContext(MusicPlayerContext);

  const popularSongs = songs.songs.filter((s) =>
    songs.popularSongs.includes(s.id)
  );

  useEffect(() => {
    setPlaylist(popularSongs);
  }, []);

  return (
    <div className="Home">
      <Container>
        <Row className="daily-mix">
          <h2 className="home-title">Daily Mixes For You</h2>
          <Col className="daily-mix__cont">
            {songs.dailyMix.map((dm, i) => (
              <Link
                key={i}
                className="daily-mix__item"
                to={`/daily-mix/${dm.id}`}
              >
                <img src={dm.image} alt={dm.name} />
                <h2>{dm.name}</h2>
              </Link>
            ))}
          </Col>
        </Row>

        <Row>
          <Col>
            <h2 className="home-title">Popular</h2>
            <div className="popular">
              <Link
                to={`/playlists/1`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="popular">
                  <img
                    src={songs.playlists[0].image}
                    alt={songs.playlists[0].name}
                  />
                  <h1>{songs.playlists[0].name}</h1>
                </div>
              </Link>
            </div>
          </Col>
          <Col>
            <h2 className="home-title px-2">Popular Songs</h2>
            <Container className="py-2">
              {popularSongs.map((s, i) => (
                <Row
                  className="mb-1"
                  onClick={() => changeCurrentSong(i)}
                  key={i}
                >
                  <Col className="d-flex" style={{ width: "100%" }}>
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "20px",
                      }}
                      src={s.image}
                      alt="Album Cover"
                    />
                    <div style={{ color: "silver" }}>
                      <h5>{s.title}</h5>
                      <p>{s.artist}</p>
                    </div>
                  </Col>
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
