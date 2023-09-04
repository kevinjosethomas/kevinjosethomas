import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Work from "pages/Work";
import Stack from "pages/Stack";
import Music from "pages/Music";

import "ui/styles/tailwind.css";

function App() {
  return (
    <div className="grid h-full min-h-screen bg-black 4xl:items-start 4xl:justify-center 4xl:py-48">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
