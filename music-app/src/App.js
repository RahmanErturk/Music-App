import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Albums from "./views/Albums";
import Artist from "./views/Artist";
import Fav from "./views/Fav";
import Navb from "./components/Navb";
import MusicPlayer from "./components/MusicPlayer";
import MusicPlayerProvider from "./context/MusicPlayerProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MusicPlayerProvider>
          <Navb />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/artists" element={<Artist />} />
            <Route path="/liked-songs" element={<Fav />} />
          </Routes>
          <MusicPlayer />
        </MusicPlayerProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
