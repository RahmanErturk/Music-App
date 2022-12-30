import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import PlaylistOverview from "./views/PlaylistOverview";
import Artist from "./views/Artist";
import Fav from "./views/Fav";
import Navb from "./components/Navb";
import SearchBar from "./components/SearchBar";
import MusicPlayer from "./components/MusicPlayer";
import MusicPlayerProvider from "./context/MusicPlayerProvider";
import DailyMix from "./views/DailyMix";
import Playlist from "./views/Playlist";
import ArtistOverview from "./views/ArtistOverview";
import SearchResult from "./views/SearchResult";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MusicPlayerProvider>
          <SearchBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playlists" element={<PlaylistOverview />} />
            <Route path="/playlists/:id" element={<Playlist />} />
            <Route path="/artists" element={<ArtistOverview />} />
            <Route path="/artists/:id" element={<Artist />} />
            <Route path="/liked-songs" element={<Fav />} />
            <Route path="/daily-mix/:id" element={<DailyMix />} />
            <Route path="/search/:value" element={<SearchResult />} />
          </Routes>
          <Navb />
          <MusicPlayer />
        </MusicPlayerProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
