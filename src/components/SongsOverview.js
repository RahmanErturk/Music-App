import { useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { Container, Row, Col } from "react-bootstrap";

export default function SongsOverview({ playlist, cover }) {
  const { changeCurrentSong } = useContext(MusicPlayerContext);

  return (
    <Container style={{ boxSizing: "border-box" }}>
      <div className="dm-page__img mb-5">
        <img src={cover.cover} alt={cover.name} />
      </div>

      {playlist.map((s, i) => {
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
  );
}
