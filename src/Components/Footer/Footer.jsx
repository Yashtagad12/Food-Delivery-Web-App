import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { assets } from "../../assets/assets";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = ({ setShowLogin }) => {

  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <Link to='/'><img src={assets.logo} alt="logo" /></Link>
          <p>
            Explore an exciting selection of mouth-watering dishes made fresh from premium ingredients by expert chefs.
          </p>
          <div className="footer-social-icons">
            <Link to='/'><FaFacebookF /></Link>
            <Link to='/'><FaInstagram /></Link>
            <Link to='/'><FaWhatsapp /></Link>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Quick Links</h2>
          <ul>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/menu'}><li>Our Menu</li></Link>
            <Link to={'/app-download'}><li>Mobile App</li></Link>
            <Link to={'/contact-us'}><li>Contact Us</li></Link>
          </ul>
        </div>

        <div className="footer-content-center">
          <h2>Important Links</h2>
          <ul>
            <li onClick={() => setShowLogin("Login")}>Login</li>
            <li onClick={() => setShowLogin("Sign Up")}>Register</li>
            <Link to='/'><li>User Agreements</li></Link>
            <Link to='/'><li>Privacy Policy</li></Link>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li><a href="tel:+11234567890"><FaPhoneAlt className="contact-icon" /> +1-1234567890</a></li>
            <li><a href="mailto:info@tomato.com"><FaEnvelope className="contact-icon" /> info@tomato.com</a></li>
            <li><a href="https://maps.app.goo.gl/aSVokZqnWnDZEtxS8" target="_blank"><FaMapMarkerAlt className="contact-icon" /> 12, MG road, Vadodara, Gujarat</a></li>
          </ul>
        </div>
      </div >
      <hr />
      <p className="footer-copyright">
        &copy; Copyright {currentYear} <Link to='/' className="link">Tomato</Link>. All rights reserved.
      </p>
    </div >
  );
};

export default Footer;