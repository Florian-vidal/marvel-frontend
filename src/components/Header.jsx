// Import du logo Marvel depuis le dossier assets
import logo from "../assets/logo.webp";

// Import de Link pour créer des liens internes (navigation sans rechargement de page)
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      {/* Logo Marvel qui redirige vers la page d'accueil */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo Marvel" />
        </Link>
      </div>

      {/* Menu de navigation */}
      <nav>
        <ul>
          {/* Lien vers la page Comics */}
          <Link to="/comics">
            <li className="onglets">Comics</li>
          </Link>

          {/* Lien vers la page Personnages */}
          <Link to="/characters">
            <li className="onglets">Personnages</li>
          </Link>

          {/* Lien vers la page Favoris */}
          <Link to="/favoris">
            <li className="onglets">Mes favoris</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
