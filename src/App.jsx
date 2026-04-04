import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import AppDownload from "./Components/AppDownload/AppDownload";
import Cart from "./Pages/Cart/Cart";
import Menu from "./Pages/Menu/Menu";
import ContactUs from "./Pages/Contactus/ContactUs";
import PlaceOrder from "./Pages/Place-order/PlaceOrder"

function App() {
  const [ShowLogin, setShowLogin] = useState(null);

  return (
    <>
{ShowLogin && <LoginPopup setShowLogin={setShowLogin} currState={ShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/app-download" element={<AppDownload />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/order" element={<PlaceOrder />}/>
        </Routes>
        <Footer setShowLogin={setShowLogin} />
      </div>

    </>
  );
}

export default App;
