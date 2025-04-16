import React from "react";
import CompoOne from "./getComponents/CompoOne";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompoTwo from "./getComponents/CompoTwo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompoOne />} />
        <Route path="/item/:id" element={<CompoTwo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
