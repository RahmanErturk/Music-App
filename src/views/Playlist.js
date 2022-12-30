import { useContext, useEffect } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { useParams } from "react-router-dom";

import SongsOverview from "../components/SongsOverview";
import songs from "../data.json";

export default function Playlist() {
  const { id } = useParams();

  const { allSongs, setPlaylist } = useContext(MusicPlayerContext);

  const playlist = songs.playlists.find((pl) => pl.id === +id);
  console.log(playlist);

  const playlistSongs = allSongs.filter((s) => playlist.songs.includes(s.id));

  useEffect(() => {
    setPlaylist(playlistSongs);
  }, [id]);

  return (
    <div className="Playlist">
      <SongsOverview playlist={playlistSongs} cover={playlist} />
    </div>
  );
}
