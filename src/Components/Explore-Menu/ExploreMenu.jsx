import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ Category, setCategory }) => {

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>What's on Your Mind?</h1>
      <p className='explore-menu-text'>Browse through our wide variety of categories, each packed with irresistible options. Whether you're craving something light or indulgent, we have the perfect dish waiting just for you.</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
              <img className={Category === item.menu_name ? "active" : ""} src={item.menu_image} alt="menu image" />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;