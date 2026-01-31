import "./App.css";
import React from "react";
import Home from "./routes/Home";
import About from "./routes/About";
import Navigation from "./components/Navigation";
import { HashRouter, Routes, Route } from "react-router-dom"; // 1. Routes 추가

function App() {
  return (
    <HashRouter>
      <Navigation />
      {/* 2. 모든 Route는 반드시 Routes로 감싸야 합니다. */}
      <Routes>
        {/* 3. component={Home} 대신 element={<Home />}를 사용합니다. */}
        {/* 4. v6는 기본적으로 exact 기능이 포함되어 있어 exact={true}는 안 써도 됩니다. */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
