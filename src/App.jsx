import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import ComicsFromCharacter from "./pages/ComicsFromCharacter";


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/character/:id" element={<ComicsFromCharacter />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
