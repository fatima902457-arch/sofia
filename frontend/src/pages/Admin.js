import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newFood, setNewFood] = useState({ name: '', price: 0, category: '', description: '' });
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      if (activeTab === 'orders') {
        const response = await axios.get('/api/orders/all', { headers });
        setOrders(response.data);
      } else if (activeTab === 'foods') {
        const response = await axios.get('/api/foods', { headers });
        setFoods(response.data);
      } else if (activeTab === 'categories') {
        const response = await axios.get('/api/categories', { headers });
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/foods', newFood, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Food added successfully!');
      setNewFood({ name: '', price: 0, category: '', description: '' });
      fetchData();
    } catch (error) {
      alert('Error adding food: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/foods/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Food deleted successfully!');
        fetchData();
      } catch (error) {
        alert('Error deleting food: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order status updated!');
      fetchData();
    } catch (error) {
      alert('Error updating order: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="admin-container">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={`tab ${activeTab === 'foods' ? 'active' : ''}`}
            onClick={() => setActiveTab('foods')}
          >
            Foods
          </button>
          <button 
            className={`tab ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="tab-content">
            {activeTab === 'orders' && (
              <div className="orders-section">
                <h2>All Orders</h2>
                <div className="orders-table">
                  {orders.length === 0 ? (
                    <p>No orders found</p>
                  ) : (
                    orders.map(order => (
                      <div key={order._id} className="order-row">
                        <div className="order-info">
                          <p><strong>Order ID:</strong> {order._id.slice(-8)}</p>
                          <p><strong>Status:</strong> {order.status}</p>
                          <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
                        </div>
                        <select 
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'foods' && (
              <div className="foods-section">
                <h2>Manage Foods</h2>
                
                <div className="add-food-form">
                  <h3>Add New Food</h3>
                  <form onSubmit={handleAddFood}>
                    <input
                      type="text"
                      placeholder="Food name"
                      value={newFood.name}
                      onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={newFood.price}
                      onChange={(e) => setNewFood({...newFood, price: e.target.value})}
                      required
                    />
                    <select
                      value={newFood.category}
                      onChange={(e) => setNewFood({...newFood, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Description"
                      value={newFood.description}
                      onChange={(e) => setNewFood({...newFood, description: e.target.value})}
                    />
                    <button type="submit" className="btn btn-primary">Add Food</button>
                  </form>
                </div>

                <div className="foods-list">
                  <h3>Current Foods</h3>
                  {foods.length === 0 ? (
                    <p>No foods found</p>
                  ) : (
                    foods.map(food => (
                      <div key={food._id} className="food-row">
                        <div className="food-info">
                          <p><strong>{food.name}</strong></p>
                          <p>₹{food.price}</p>
                          <p>{food.description}</p>
                        </div>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleDeleteFood(food._id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="categories-section">
                <h2>Manage Categories</h2>
                <div className="categories-list">
                  {categories.length === 0 ? (
                    <p>No categories found</p>
                  ) : (
                    categories.map(cat => (
                      <div key={cat._id} className="category-row">
                        <div>
                          <p><strong>{cat.name}</strong></p>
                          <p>{cat.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
