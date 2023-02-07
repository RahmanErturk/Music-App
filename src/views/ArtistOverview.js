import { useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

export default function ArtistOverview() {
  const { data } = useContext(MusicPlayerContext);

  return (
    <div className="Albums">
      <Container>
        <h1>Artists</h1>
        <Row>
          {data.artists?.map((a, i) => (
            <Col className="playlists" key={i}>
              <Link
                to={`/artists/${a.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="pl-item">
                  <div>
                    <img src={a.image} alt={a.name} />
                  </div>
                  <h4>This is {a.name}</h4>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
