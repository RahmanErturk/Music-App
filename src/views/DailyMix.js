import { useContext, useEffect } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { useParams } from "react-router-dom";

import SongsOverview from "../components/SongsOverview";
import songs from "../data.json";

export default function DailyMix() {
  const { id } = useParams();

  const { setPlaylist } = useContext(MusicPlayerContext);

  const dailyMix = songs.dailyMix.find((dm) => dm.id === +id);

  const dailyMixSongs = songs.songs.filter((s) =>
    dailyMix.songs.includes(s.id)
  );

  useEffect(() => {
    setPlaylist(dailyMixSongs);
  }, [id]);

  return (
    <div className="dm-page">
      <SongsOverview playlist={dailyMixSongs} cover={dailyMix} />
    </div>
  );
}
