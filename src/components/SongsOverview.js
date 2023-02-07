import { useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { Container, Row, Col, Button } from "react-bootstrap";

import Song from "./Song";

export default function SongsOverview({ playlist, cover }) {
  const { changeCurrentSong } = useContext(MusicPlayerContext);

  const artists = [];
  const first3Artists = () => {
    const index = playlist?.length < 3 ? playlist?.length - 1 : 2;
    for (let i = index; i >= 0; i--) {
      artists.push(playlist ? playlist[i]?.artist : null);
    }
    const uniqueArtists = [...new Set(artists)];

    return uniqueArtists.length >= 3
      ? uniqueArtists.join(", ")
      : uniqueArtists.length === 2
      ? uniqueArtists.join(" and ")
      : uniqueArtists.join("");
  };

  return (
    <Container style={{ boxSizing: "border-box" }}>
      <div className="songs_overview_cover">
        {cover?.cover !== "" ? (
          <div className="cover_img">
            <img src={cover?.cover} alt={cover?.name} />
          </div>
        ) : cover?.songs.length > 0 ? (
          <div className="cover_img">
            <img src={playlist[0]?.image} alt={cover?.name} />
          </div>
        ) : null}
        <div className="cover_info">
          <h1>{cover?.name}</h1>

          <p>
            <strong>{first3Artists()}</strong>{" "}
            {artists.length > 3 ? "and more" : ""}
          </p>

          <p>
            Made for you by <strong>My Music App</strong>
          </p>
          <div>
            <Button
              onClick={() => changeCurrentSong(playlist, 0)}
              variant="success"
            >
              Play
            </Button>
            <h5>
              {playlist?.length > 1
                ? playlist?.length + " songs"
                : playlist?.length + " song"}
            </h5>
          </div>
        </div>
      </div>
      <Row className="songs_overview_info_titles">
        <Col className="info_titles_item">
          <p style={{ fontSize: "1.2rem", color: "silver" }}># Title</p>
        </Col>
        <Col className="info_titles_item">
          <p style={{ fontSize: "1.2rem", color: "silver" }}>Album</p>
        </Col>
        <Col className="info_titles_item"></Col>
      </Row>
      <Song playlist={playlist} />
    </Container>
  );
}
