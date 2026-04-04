import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { StoreContext } from "../../Context/StoredContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, promo, setPromo } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const cartItemsList = food_list.filter((item) => cartItems[item._id] > 0);
  const isEmpty = cartItemsList.length === 0;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!promo) return alert("Please enter a code"); // Optional validation

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Promo applied!");
    }, 2000);
  };


  return (
    <div className="cart">
      <div className="cart-items">
        {isEmpty ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>No items are added to the cart. Browse our menu and add something delicious!</p>
            <button onClick={() => navigate("/menu")}>Browse Menu</button>
          </div>
        ) : (
          <>
            <div className="cart-items-title cart-items-header">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {cartItemsList.map((item, index) => (
              <div key={index} className="cart-items-title cart-items-item">
                <img src={item.image} alt={item.name} />
                <p className="item-name">{item.name}</p>
                <p data-label="Price">${item.price}</p>
                <p data-label="Quantity">{cartItems[item._id]}</p>
                <p data-label="Total">${item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className="cross" data-label="Remove">✕</p>
              </div>
            ))}
          </>
        )}
      </div>

      {!isEmpty && (
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 25}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 25}</p>
              </div>
            </div>
            <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
          </div>

          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code" />
                <button
                  type="button" // Changed to type="button" since it's not in a <form> tag
                  className={`submit-btn ${isSubmitting ? 'disabled-btn' : ''}`}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;