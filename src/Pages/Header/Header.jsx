import './Header.css';
import { FaArrowRight } from 'react-icons/fa';
import { HashLink as Link } from 'react-router-hash-link';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Delicious Food, Delivered Fast</h2>
        <p>Explore an exciting selection of mouth-watering dishes made fresh from premium ingredients by expert chefs. We bring restaurant-quality meals straight to your doorstep, making every bite a memorable experience.</p>
        <Link smooth to="/menu#all-dishes">
          <button>Explore Now <FaArrowRight /></button>
        </Link>
      </div>
    </div >
  );
};

export default Header;