import { useState } from "react";

import { useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import AddIcon from "@mui/icons-material/Add";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function CreatePlaylist({ song, setHide }) {
  const { getData } = useContext(MusicPlayerContext);

  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createPlaylist = () => {
    fetch(`http://localhost:4000/api/playlists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: value,
        image: "",
        cover: "",
        songs: [],
      }),
    }).then((res) => {
      res.json();
      getData();
    });
  };

  return (
    <>
      {song !== undefined ? (
        <p
          variant="primary"
          onClick={() => {
            setHide(false);
            handleShow();
          }}
        >
          + New Playlist
        </p>
      ) : (
        <AddIcon
          onClick={handleShow}
          sx={{ fontSize: "3rem", margin: "0 8px" }}
        />
      )}

      <Modal
        show={show}
        onHide={() => {
          if (song !== undefined) {
            setHide(true);
          }
          handleClose();
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="create_playlist"
      >
        <Modal.Header className="create_playlist_header">
          <Modal.Title>Create playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body className="create_playlist_body">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Give a name to your Playlist</Form.Label>
              <Form.Control
                className="create_playlist_name"
                type="text"
                placeholder="My Playlist"
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="create_playlist_footer">
          <Button
            variant="secondary"
            onClick={() => {
              if (song !== undefined) {
                setHide(true);
              }
              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="success"
            onClick={(e) => {
              e.preventDefault();
              if (song !== undefined) {
                setHide(true);
              }
              handleClose();
              createPlaylist();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
