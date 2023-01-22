import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <h2>BIKE RENTAL</h2>
      <hr></hr>
      <ul>
        <li>
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/add_bikes">
            Add Bike
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/database">
            Database
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/maps">
            Maps
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/notifications">
            Notifications
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
