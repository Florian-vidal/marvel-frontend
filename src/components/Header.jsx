import logo from "../assets/logo.webp";
import { Link, useLocation } from "react-router-dom";
import Cookie from "js-cookie";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo Marvel" />
        </Link>

        <nav>
          <ul>
            <Link to="/comics">
              <li>Comics</li>
            </Link>
            <Link to="/">
              <li>Personnages</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
