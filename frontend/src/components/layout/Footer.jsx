import "./Footer.css";
import { FaIndustry, FaCopyright } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-left">
        <FaIndustry className="footer-icon" />
        <span>SAIL Project Industry Dashboard</span>
      </div>

      <div className="footer-center">
        <FaCopyright className="footer-copy-icon" />
        <span>{currentYear} Steel Authority of India Limited</span>
      </div>

      <div className="footer-right">
        <span>Version 1.0.0</span>
      </div>
    </footer>
  );
};

export default Footer;