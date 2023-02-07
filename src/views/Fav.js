import { useContext } from "react";

import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import SongsOverview from "../components/SongsOverview";

export default function Fav() {
  const { data } = useContext(MusicPlayerContext);

  const likedSongsInDb = data.songs?.filter((s) => s.isLiked === true);

  const cover = {
    cover:
      "https://cdn.pixabay.com/photo/2017/05/15/23/44/heart-icon-2316451_1280.png",
  };

  return (
    <div className="Fav-songs">
      <SongsOverview playlist={likedSongsInDb} cover={cover} />
    </div>
  );
}
