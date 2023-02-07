import { useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { useParams } from "react-router-dom";

import SongsOverview from "../components/SongsOverview";

export default function Playlist() {
  const { id } = useParams();

  const { data } = useContext(MusicPlayerContext);

  const playlist = data.playlists?.find((pl) => pl.id === +id);

  const playlistSongs = data.songs?.filter((s) =>
    playlist.songs?.includes(s.id)
  );

  return (
    <div className="Playlist">
      <SongsOverview playlist={playlistSongs} cover={playlist} />
    </div>
  );
}
