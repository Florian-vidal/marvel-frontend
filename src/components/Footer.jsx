// Import du logo Marvel depuis le dossier assets
import logo from "../assets/logo.webp";

// Import de Link pour créer un lien interne vers la page d'accueil
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        {/* Logo Marvel qui renvoie vers la page d'accueil */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo Marvel" />
          </Link>
        </div>
      </div>

      {/* Zone de copyright */}
      <div className="copyright">
        <p>@{new Date().getFullYear()} site réalisé par Florian Vidal</p>

      </div>
    </footer>
  );
};

export default Footer;
