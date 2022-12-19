import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "pages/Home";

import "ui/styles/tailwind.css";

function App() {
  return (
    <div className="grid h-full min-h-screen w-screen bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
