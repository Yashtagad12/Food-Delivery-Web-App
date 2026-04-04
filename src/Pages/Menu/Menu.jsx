import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoredContext";
import { menu_list, food_list } from "../../assets/assets";
import "./Menu.css";
import FoodItems from "../../Components/FoodItems/FoodItems";
import bannerImg from '../../assets/banner-img.jpg';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Menu = () => {
    const [Category, setCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const { food_list: contextFoodList, popupItem, popupVisible, setPopupVisible } = useContext(StoreContext);

    const displayList = contextFoodList || food_list;

    const filteredItems = displayList.filter((item) => {
        const matchCategory = Category === "All" || Category === item.category;
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return (
        <div className="menu-page">

            <div className="menu-hero" style={{ background: `url(${bannerImg}) center/cover no-repeat` }}>
                <div className="menu-hero-content">
                    <span className="menu-eyebrow">Our Full Menu</span>
                    <h1 className="menu-hero-title">
                        Every Craving, <br />
                        <em>Covered.</em>
                    </h1>
                    <p className="menu-hero-sub">
                        From crisp salads to indulgent desserts — explore every dish we craft fresh, just for you.
                    </p>
                    <div className="menu-search-bar">
                        <svg className="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for a dish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="search-clear" onClick={() => setSearchQuery("")}>✕</button>
                        )}
                    </div>
                </div>
            </div>

            <div className="menu-body" id="all-dishes">

                <aside className="menu-sidebar">
                    <p className="sidebar-label">Categories</p>
                    <div
                        className={`sidebar-item ${Category === "All" ? "active" : ""}`}
                        onClick={() => setCategory("All")}
                    >
                        <span className="sidebar-icon all-icon">🍽</span>
                        <span>All Items</span>
                        <span className="sidebar-count">{displayList.length}</span>
                    </div>
                    {menu_list.map((item, index) => {
                        const count = displayList.filter((f) => f.category === item.menu_name).length;
                        return (
                            <div
                                key={index}
                                className={`sidebar-item ${Category === item.menu_name ? "active" : ""}`}
                                onClick={() =>
                                    setCategory((prev) =>
                                        prev === item.menu_name ? "All" : item.menu_name
                                    )
                                }
                            >
                                <img src={item.menu_image} alt={item.menu_name} className="sidebar-thumb" />
                                <span>{item.menu_name}</span>
                                <span className="sidebar-count">{count}</span>
                            </div>
                        );
                    })}
                </aside>

                <main className="menu-main">

                    <div className="menu-strip">
                        <div
                            className={`strip-pill ${Category === "All" ? "active" : ""}`}
                            onClick={() => setCategory("All")}
                        >
                            All
                        </div>
                        {menu_list.map((item, index) => (
                            <div
                                key={index}
                                className={`strip-pill ${Category === item.menu_name ? "active" : ""}`}
                                onClick={() =>
                                    setCategory((prev) =>
                                        prev === item.menu_name ? "All" : item.menu_name
                                    )
                                }
                            >
                                <img src={item.menu_image} alt={item.menu_name} />
                                {item.menu_name}
                            </div>
                        ))}
                    </div>

                    <div className="menu-results-header">
                        <h2 className="menu-section-title">
                            {Category === "All" ? "All Dishes" : Category}
                        </h2>
                        <span className="menu-count-badge">
                            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
                        </span>
                    </div>

                    {filteredItems.length > 0 ? (
                        <div className="menu-grid">
                            {filteredItems.map((item, index) => (
                                <FoodItems
                                    key={index}
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="menu-empty">
                            <span className="empty-icon">🍴</span>
                            <p>No dishes found for <strong>"{searchQuery}"</strong></p>
                            <button onClick={() => { setSearchQuery(""); setCategory("All"); }}>
                                Clear filters
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* Cart Popup */}
            {popupVisible && popupItem && (
                <div className="cart-popup">
                    <div className="cart-popup-left">
                        <img src={popupItem.image} alt={popupItem.name} />
                        <div className="cart-popup-info">
                            <p className="cart-popup-name">{popupItem.name}</p>
                            <p className="cart-popup-price">${popupItem.price}</p>
                        </div>
                    </div>
                    <Link
                        to="/cart"
                        className="cart-popup-btn"
                        onClick={() => setPopupVisible(false)}
                    >
                        View Cart
                    </Link>
                    <button
                        className="cart-popup-close"
                        onClick={() => setPopupVisible(false)}
                    >
                        ✕
                    </button>
                </div>
            )}

        </div>
    );
};

export default Menu;