import { useContext, useState, useRef } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import AddIcon from "@mui/icons-material/Add";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import CreatePlaylist from "./CreatePlaylist";

function AddPlaylistBtn({ song }) {
  const { data } = useContext(MusicPlayerContext);

  const [hide, setHide] = useState(true);

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToPlaylist = (id) => {
    const index = data.playlists?.findIndex((pl) => pl.id === id);
    console.log(song.id);

    fetch(`http://localhost:4000/api/playlists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        songs: [...data.playlists[index].songs, song.id],
      }),
    }).then((res) => {
      res.status === 202 ? window.location.reload() : console.error(res.status);
    });
  };

  return (
    <>
      <Overlay
        rootClose={hide}
        target={target.current}
        placement={"left"}
        show={show}
        onHide={handleClose}
      >
        <Popover className="add_playlist" id={`popover-positioned-${"left"}`}>
          <Popover.Header
            className="add_playlist_header"
            as="h3"
          >{`Add to Playlist`}</Popover.Header>
          <Popover.Body className={`add_playlist_body`}>
            {data.playlists?.map((pl, i) => (
              <p key={i} onClick={() => addToPlaylist(pl.id)}>
                {pl.name}
              </p>
            ))}
          </Popover.Body>
          <div className="add_playlist_footer">
            <CreatePlaylist song={song} setHide={setHide} />
          </div>
        </Popover>
      </Overlay>

      <AddIcon ref={target} onClick={handleShow} />
    </>
  );
}

export default AddPlaylistBtn;
