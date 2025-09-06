// Import du fichier CSS global de l'application
import "./App.css";

// Import de BrowserRouter (renommé Router), Routes et Route pour gérer la navigation
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des différentes pages
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicsFromCharacter from "./pages/ComicsFromCharacter";
import Favoris from "./pages/Favoris";

// Import des composants
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroHeader from "./components/HeroHeader";

function App() {
  return (
    <>
      <Router>
        <Header />

     

        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={<Home />} />

          {/* Route vers la liste des personnages */}
          <Route path="/characters" element={<Characters />} />

          {/* Route vers la liste des comics */}
          <Route path="/comics" element={<Comics />} />

          {/* Route dynamique : affiche les comics liés à un personnage spécifique */}
          <Route path="/character/:id" element={<ComicsFromCharacter />} />

          {/* Route pour la page des favoris */}
          <Route path="/favoris" element={<Favoris />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
