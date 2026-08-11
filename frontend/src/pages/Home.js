import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [foodRes, catRes] = await Promise.all([
        axios.get('/api/foods'),
        axios.get('/api/categories')
      ]);
      setFoods(foodRes.data);
      setCategories(catRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const addToCart = (food) => {
    const existingItem = cart.find(item => item._id === food._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }
    setCart([...cart]);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to FoodHub</h1>
        <p>Order delicious food from your favorite restaurants</p>
      </div>

      <div className="container">
        <div className="categories-section">
          <h2 className="section-title">Categories</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <div key={category._id} className="category-card">
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="foods-section">
          <h2 className="section-title">Featured Foods</h2>
          <div className="foods-grid">
            {foods.map(food => (
              <div key={food._id} className="food-card">
                <img src={food.image} alt={food.name} className="card-image" />
                <div className="card-content">
                  <h3 className="card-title">{food.name}</h3>
                  <p className="card-description">{food.description}</p>
                  <div className="card-footer">
                    <span className="card-price">₹{food.price}</span>
                    <span className="card-rating">⭐ {food.rating}</span>
                  </div>
                  {food.isVegetarian && <span className="veg-badge">🌱 Veg</span>}
                  <button 
                    className="btn btn-primary add-to-cart-btn"
                    onClick={() => addToCart(food)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
