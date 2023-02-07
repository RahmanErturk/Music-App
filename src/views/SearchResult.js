import { useContext } from "react";

import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SearchResult() {
  const { searchTerm, data, changeCurrentSong } =
    useContext(MusicPlayerContext);

  const filterData = (item, key) => {
    return searchTerm
      ? data[item]?.filter((d) =>
          d[key].toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  };

  const filterTags = (fName, title) => {
    return (
      <Container>
        <h5>{title}</h5>
        {fName.map((a, i) => (
          <Row key={i}>
            <Link
              to={`/${title.toLowerCase()}/${a.id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Col className="d-flex" style={{ width: "100%" }}>
                <img
                  style={{
                    width: "60px",
                    height: "60px",
                    marginRight: "20px",
                  }}
                  src={a.image}
                  alt="Artist"
                />
                <div>
                  <h4>{a.name}</h4>
                  <p>Artist</p>
                </div>
              </Col>
            </Link>
          </Row>
        ))}
      </Container>
    );
  };
  const filteredSongs = filterData("songs", "title");
  const filteredArtist = filterData("artists", "name");
  const filteredPlaylist = filterData("playlists", "name");

  return (
    <div className="dm-page">
      <Container>
        <h3>Results for {searchTerm}</h3>
      </Container>
      {filteredSongs.length !== 0 ? (
        <Container style={{ boxSizing: "border-box" }}>
          <h5>Songs</h5>
          {filteredSongs.map((s, i) => {
            return (
              <Row
                style={{ width: "500px" }}
                onClick={() => changeCurrentSong(filteredSongs, i)}
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
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.artist}</p>
                  </div>
                </Col>
              </Row>
            );
          })}
        </Container>
      ) : null}

      {filteredArtist.length !== 0
        ? filterTags(filteredArtist, "Artists")
        : null}

      {filteredPlaylist.length !== 0
        ? filterTags(filteredPlaylist, "Playlists")
        : null}
    </div>
  );
}
