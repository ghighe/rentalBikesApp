import "./NavBar.css";
import { Link } from "react-router-dom";
import {
  MdDirectionsBike,
  MdOutlineDashboard,
  MdOutlinePedalBike,
  MdOutlineNotificationsNone
} from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";
import { SiGooglemaps } from "react-icons/si";

const NavBar = ({ isOpen }) => {
  //object to store all the shared style
  const globalMenuStyle = {
    divStyle: `flex items-center rounded-md mt-6 ${
      !isOpen ? "px-2.5" : "px-4"
    } py-2`,
    iconStyle: `text-white text-lg block float-left cursor-pointer  ${
      isOpen && "mr-2"
    }`,
    linkStyle: `text-white text-lg font-medium px-4 py-1 text-center duration-300 ${
      !isOpen && "hidden"
    }`
  };

  return (
    <div>
      {/* header style */}
      <div className="inline-flex">
        <MdDirectionsBike
          className={`text-white text-4xl rounded cursor-pointer block float-left mr-2 ${
            !isOpen && "py-2 text-4xl"
          }`}
        />
        <h2
          className={`text-white origin-left font-medium text-2xl duration-300 cursor-pointer ${
            !isOpen && "scale-0"
          } `}
        >
          BIKE RENTAL
        </h2>
      </div>
      <hr></hr>
      {/* dashboard style */}
      <div className={globalMenuStyle.divStyle}>
        <MdOutlineDashboard className={globalMenuStyle.iconStyle} />
        <Link to="/" className={globalMenuStyle.linkStyle}>
          Dashboard
        </Link>
      </div>
      {/* add_bikes style */}
      <div className={globalMenuStyle.divStyle}>
        <MdOutlinePedalBike className={globalMenuStyle.iconStyle} />
        <Link to="/add_bikes" className={globalMenuStyle.linkStyle}>
          Add Bike
        </Link>
      </div>
      {/* database style */}
      <div className={globalMenuStyle.divStyle}>
        <AiOutlineDatabase className={globalMenuStyle.iconStyle} />
        <Link to="/database" className={globalMenuStyle.linkStyle}>
          Database
        </Link>
      </div>
      {/* maps style */}
      <div className={globalMenuStyle.divStyle}>
        <SiGooglemaps className={globalMenuStyle.iconStyle} />
        <Link to="/maps" className={globalMenuStyle.linkStyle}>
          Maps
        </Link>
      </div>
      {/* notifications style */}
      <div className={globalMenuStyle.divStyle}>
        <MdOutlineNotificationsNone className={globalMenuStyle.iconStyle} />
        <Link to="/notifications" className={globalMenuStyle.linkStyle}>
          Notifications
        </Link>
      </div>
      {/* <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/add_bikes">Add Bike</Link>
        </li>
        <li>
          <Link to="/database">Database</Link>
        </li>
        <li>
          <Link to="/maps">Maps</Link>
        </li>
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>
      </ul> */}
    </div>
  );
};

export default NavBar;
