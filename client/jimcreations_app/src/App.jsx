import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import VideographerPortfolio from "./Components/VideographerPortfolio";
import Contact from "./Components/Contact";
import VideographerBooking from "./Components/VideographerBooking";
const lightTheme = {
  background: "#ffffff",
  color: "#000000",
};

const darkTheme = {
  background: "#000000",
  color: "#ffffff",
};

const App = () => {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<VideographerPortfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<VideographerBooking/>} />
        </Routes>
    </Router>
  );
};

export default App;
