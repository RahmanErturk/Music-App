import { useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { useParams } from "react-router-dom";

import SongsOverview from "../components/SongsOverview";

export default function DailyMix() {
  const { id } = useParams();

  const { data } = useContext(MusicPlayerContext);

  const dailyMix = data.dailyMix?.find((dm) => dm.id === +id);

  const dailyMixSongs = data.songs?.filter((s) =>
    dailyMix.songs?.includes(s.id)
  );

  return (
    <div className="dm-page">
      <SongsOverview playlist={dailyMixSongs} cover={dailyMix} />
    </div>
  );
}
