import "./Navbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import sailLogo from "../../assets/logo/sail-logo.png";

const Navbar = () => {
  const now = new Date();

  const date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <img
          src={sailLogo}
          alt="SAIL Logo"
          className="navbar-logo"
        />

        <div className="navbar-title">
          <h2>SAIL Project Industry Dashboard</h2>
          <p>Bokaro Steel Plant</p>
        </div>
      </div>

      {/* Search */}
      <div className="navbar-search">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      {/* Right */}
      <div className="navbar-right">

        <div className="datetime">
          <span>{date}</span>
          <span>{time}</span>
        </div>

        <button className="notification-btn">
          <FaBell />
        </button>

        <button className="profile-btn">
          <FaUserCircle />
        </button>

      </div>
    </header>
  );
};

export default Navbar;