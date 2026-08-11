import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiShoppingCart, FiLogOut, FiHome } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ isLoggedIn, userRole, onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍽️ FoodHub
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            <FiHome /> Home
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/cart" className="nav-link">
                <FiShoppingCart /> Cart
              </Link>
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
              {userRole === 'admin' && (
                <Link to="/admin" className="nav-link admin">
                  Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="nav-link logout">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
