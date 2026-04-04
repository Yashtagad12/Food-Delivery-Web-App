import { useContext, useState } from "react";
import { StoreContext } from "../../Context/StoredContext";
import FoodItems from "../FoodItems/FoodItems";
import "./FoodDisplay.css";
import { Link } from "react-router-dom";

const FoodDisplay = ({ Category }) => {
  const { food_list } = useContext(StoreContext);
  const [popupItem, setPopupItem] = useState(null);

  const handleAddToCart = (item) => {
    setPopupItem(item);
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Fresh Picks Just for You</h2>
      <div className="food-display-list">
        {food_list
          .filter((item) => Category === "All" || Category === item.category)
          .map((item, index) => (
            <FoodItems
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
      </div>

      {/* Cart Popup */}
      {popupItem && (
        <div className="cart-popup">
          <div className="cart-popup-left">
            <img src={popupItem.image} alt={popupItem.name} />
            <div className="cart-popup-info">
              <p className="cart-popup-name">{popupItem.name}</p>
              <p className="cart-popup-price">${popupItem.price}</p>
            </div>
          </div>
          <Link to="/cart" className="cart-popup-btn" onClick={() => setPopupItem(null)}>
            View Cart
          </Link>
          <button className="cart-popup-close" onClick={() => setPopupItem(null)}>✕</button>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;