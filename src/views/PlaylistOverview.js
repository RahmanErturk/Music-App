import React from "react";
import { Link, useParams } from "react-router-dom";

import songs from "../data.json";

import { Container, Row, Col } from "react-bootstrap";

export default function PlaylistOverview() {
  return (
    <div className="Albums">
      <Container>
        <h1>Playlists</h1>
        <Row>
          {songs.playlists.map((pl, i) => (
            <Col className="playlists" key={i}>
              <Link
                to={`/playlists/${pl.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="pl-item">
                  <div>
                    <img src={pl.image} alt={pl.name} />
                  </div>
                  <h4>{pl.name}</h4>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
