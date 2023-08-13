import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Work from "pages/Work";
import Stack from "pages/Stack";

import "ui/styles/tailwind.css";

function App() {
  return (
    <div className="grid h-full min-h-screen bg-black 4xl:items-center 4xl:justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/stack" element={<Stack />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
