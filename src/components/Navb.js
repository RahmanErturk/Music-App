import React from "react";

import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

export default function Navb() {
  return (
    <div className="nav-bar">
      <Nav className="flex-column ">
        <Nav.Link>
          <Link className="nav-bar__link" to="/">
            Home
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link className="nav-bar__link" to="/playlists">
            Playlists
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link className="nav-bar__link" to="/artists">
            Artists
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link className="nav-bar__link" to="/liked-songs">
            Liked Sogs
          </Link>
        </Nav.Link>
      </Nav>
    </div>
  );
}
