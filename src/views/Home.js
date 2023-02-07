import { useContext } from "react";

import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { Link } from "react-router-dom";

import Song from "../components/Song";

import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/FavoriteSharp";
import AddPlaylistBtn from "../components/AddPlaylistBtn";

import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  const { changeCurrentSong, data, toggleLikeSong } =
    useContext(MusicPlayerContext);

  const popularSongs = data.songs?.filter((s) =>
    data.popularSongs?.includes(s.id)
  );

  console.log(data);
  return (
    <div className="Home">
      <Container>
        <Row className="daily-mix">
          <h2 className="home-title">Daily Mixes For You</h2>
          <Col className="daily-mix__cont">
            {data.dailyMix?.map((dm, i) => (
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

        <Row lg={2} md={1}>
          <Col>
            <h2 className="home-title">Popular</h2>
            <div className="popular">
              <Link
                to={`/playlists/1`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="popular">
                  <img
                    src={data.playlists ? data.playlists[0].image : ""}
                    alt={data.playlists ? data.playlists[0].name : ""}
                  />
                  <h1>{data.playlists ? data.playlists[0].name : ""}</h1>
                </div>
              </Link>
            </div>
          </Col>
          <Col md="auto">
            <h2 className="home-title px-5">Popular Songs</h2>
            <Container className="py-2">
              <Song playlist={popularSongs} album="none" />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
