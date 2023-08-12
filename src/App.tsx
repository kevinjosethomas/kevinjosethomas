import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Work from "pages/Work";

import "ui/styles/tailwind.css";

function App() {
  return (
    <div className="grid h-full min-h-screen w-screen bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
