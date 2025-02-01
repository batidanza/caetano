import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="vertical-nav">
      <div className="nav-top">
        <Link to="/projects" className="nav-link">
          PROYECTOS INFO EN
        </Link>
      </div>
      <div className="nav-bottom">
        <Link to="/" className="nav-link">
          CAETANO PORTAL
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
