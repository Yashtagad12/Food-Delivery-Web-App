import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets, food_list } from "../../assets/assets";
import "./Navbar.css";
import { StoreContext } from "../../Context/StoredContext";
import { FiSearch, FiX } from "react-icons/fi";

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const filteredItems = searchQuery.trim()
    ? food_list.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const handleSearchOpen = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleResultClick = () => {
    navigate("/menu");
    handleSearchClose();
    setMenuOpen(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        handleSearchClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Our Menu" },
    { to: "/app-download", label: "Mobile App" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo-link" onClick={() => setMenuOpen(false)}>
          <img src={assets.logo} alt="Tomato logo" className="logo" />
        </Link>

        <ul className="navbar-menu">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => isActive ? "active" : ""}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <div className={`navbar-search-wrap ${searchOpen ? "open" : ""}`} ref={searchRef}>
            {searchOpen ? (
              <div className="search-expanded">
                <FiSearch className="search-inline-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search dishes, categories…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button className="search-close-btn" onClick={handleSearchClose}>
                  <FiX />
                </button>
                {filteredItems.length > 0 && (
                  <div className="search-dropdown">
                    {filteredItems.slice(0, 7).map((item) => (
                      <div key={item._id} className="search-result-item" onClick={handleResultClick}>
                        <img src={item.image} alt={item.name} />
                        <div className="result-info">
                          <span className="result-name">{item.name}</span>
                          <span className="result-cat">{item.category}</span>
                        </div>
                        <span className="result-price">${item.price}</span>
                      </div>
                    ))}
                    {filteredItems.length > 7 && (
                      <div className="search-more">+{filteredItems.length - 7} more results in Menu</div>
                    )}
                  </div>
                )}
                {searchQuery.trim() && filteredItems.length === 0 && (
                  <div className="search-dropdown search-empty">
                    <span>No dishes found for "<strong>{searchQuery}</strong>"</span>
                  </div>
                )}
              </div>
            ) : (
              <button className="icon-btn" onClick={handleSearchOpen} aria-label="Search">
                <FiSearch />
              </button>
            )}
          </div>

          <div className="navbar-cart">
            <Link to="/cart" aria-label="Cart">
              <img src={assets.basket_icon} alt="cart" />
              {getTotalCartAmount() > 0 && <span className="dot" />}
            </Link>
          </div>

          <button className="signin-btn" onClick={() => setShowLogin("Login")}>
            Sign In
          </button>

          <button
            className={`hamburger ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav >

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-inner">
          <ul className="drawer-menu">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => isActive ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="drawer-actions">
            <div className="drawer-search-wrap">
              <FiSearch className="drawer-search-icon" />
              <input
                type="text"
                placeholder="Search dishes…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="drawer-search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="drawer-clear">
                  <FiX />
                </button>
              )}
            </div>

            {filteredItems.length > 0 && (
              <div className="drawer-results">
                {filteredItems.slice(0, 5).map((item) => (
                  <div
                    key={item._id}
                    className="search-result-item"
                    onClick={() => { handleResultClick(); setMenuOpen(false); }}
                  >
                    <img src={item.image} alt={item.name} />
                    <div className="result-info">
                      <span className="result-name">{item.name}</span>
                      <span className="result-cat">{item.category}</span>
                    </div>
                    <span className="result-price">${item.price}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="drawer-bottom">
              <Link to="/cart" className="drawer-cart-btn" onClick={() => setMenuOpen(false)}>
                <img src={assets.basket_icon} alt="cart" />
                <span>My Cart</span>
                {getTotalCartAmount() > 0 && <span className="drawer-cart-dot" />}
              </Link>
              <button className="drawer-signin-btn" onClick={() => { setShowLogin("Login"); setMenuOpen(false); }}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && <div className="drawer-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;