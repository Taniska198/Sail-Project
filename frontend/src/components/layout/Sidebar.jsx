import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBolt,
  FaIndustry,
  FaCogs,
  FaClock,
  FaChartLine,
  FaLightbulb,
  FaFileAlt,
  FaUpload,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>MENU</h3>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/" end>
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/energy">
          <FaBolt />
          <span>Energy Analytics</span>
        </NavLink>

        <NavLink to="/production">
          <FaIndustry />
          <span>Production</span>
        </NavLink>

        <NavLink to="/machine-health">
          <FaCogs />
          <span>Machine Health</span>
        </NavLink>

        <NavLink to="/downtime">
          <FaClock />
          <span>Downtime</span>
        </NavLink>

        <NavLink to="/forecast">
          <FaChartLine />
          <span>Forecast</span>
        </NavLink>

        <NavLink to="/recommendations">
          <FaLightbulb />
          <span>Recommendations</span>
        </NavLink>

        <NavLink to="/reports">
          <FaFileAlt />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/upload">
          <FaUpload />
          <span>Upload CSV</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button>
          <FaSignOutAlt />
          <span>NA</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;