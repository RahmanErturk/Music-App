import React from "react";
import { Link } from "react-router-dom";

import songs from "../data.json";

import { Container, Row, Col } from "react-bootstrap";

export default function ArtistOverview() {
  return (
    <div className="Albums">
      <Container>
        <h1>Artists</h1>
        <Row>
          {songs.artists.map((a, i) => (
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
