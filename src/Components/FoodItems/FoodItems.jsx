import { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoredContext";
import "./FoodItems.css";

const FoodItems = ({ id, name, price, description, image, onAddToCart }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const handleAdd = () => {
    addToCart(id);
    if (onAddToCart) onAddToCart();
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="image" />
        {!cartItems[id] ?
          <img
            className="add"
            onClick={handleAdd}
            src={assets.add_icon_white}
            alt="add icon"
          />
        :
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove icon"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={handleAdd}
              src={assets.add_icon_green}
              alt="add icon green"
            />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItems;