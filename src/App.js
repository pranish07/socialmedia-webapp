import React from "react";
import { Home } from "./pages/Home/Home";
import { Landing } from "./pages/LandingPage/Landing";
import { Route, Routes } from "react-router";

export const App = () => {
  return (
    <div>
      <Routes >
        <Route path="/" element={<Home />}/>
        <Route path="/landing" element={<Landing />} />
      </Routes>

    </div>
  );
};
