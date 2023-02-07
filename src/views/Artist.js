import { useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { useParams } from "react-router-dom";

import SongsOverview from "../components/SongsOverview";

export default function Artist() {
  const { id } = useParams();

  const { data } = useContext(MusicPlayerContext);

  const artist = data.artists?.find((a) => a.id === +id);

  const songsOfArtist = data.songs?.filter((s) => artist.songs?.includes(s.id));

  return (
    <div className="Playlist">
      <SongsOverview playlist={songsOfArtist} cover={artist} />
    </div>
  );
}
