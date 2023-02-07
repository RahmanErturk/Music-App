import { useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import CreatePlaylist from "../components/CreatePlaylist";

export default function PlaylistOverview() {
  const { data } = useContext(MusicPlayerContext);

  return (
    <div className="Albums">
      <Container>
        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <h1>Playlists</h1>
          </Col>
          <Col className="pl_overview_add">
            <CreatePlaylist />
          </Col>
        </Row>
        <Row>
          {data.playlists?.map((pl, i) => {
            const plImage = data.songs.find((s) => s.id === pl.songs[0])?.image;

            return (
              <Col className="playlists" key={i}>
                <Link
                  to={`/playlists/${pl.id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <div className="pl-item">
                    <div>
                      {pl.songs?.length > 0 ? (
                        <img
                          src={pl.image !== "" ? pl.image : plImage}
                          alt={pl.name}
                        />
                      ) : (
                        <img
                          src="https://www.pngkey.com/png/full/115-1152868_png-white-plus-sign-vector-transparent-library-plus.png"
                          alt={pl.name}
                        />
                      )}
                    </div>
                    <h4>{pl.name}</h4>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
