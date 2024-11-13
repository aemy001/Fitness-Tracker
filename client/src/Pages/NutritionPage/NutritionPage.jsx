import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodItemList from '../../Components/Food/FoodItemList';
import './NutritionPage.css';
import { jwtDecode } from 'jwt-decode';

const NutritionPage = () => {
  const [logs, setLogs] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [mealType, setMealType] = useState('breakfast');
  const [foodItemName, setFoodItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.userId;
    }
    return null;
  };
  
  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchLogs = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:5000/FitnessTracker/nutrition/user/${userId}`);
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching nutrition logs:', error.response ? error.response.data : error.message);
      }
    };

    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/FitnessTracker/fooditems');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error.response ? error.response.data : error.message);
      }
    };

    fetchLogs();
    fetchFoodItems();
  }, [userId]);

  const handleFoodItemChange = (e) => {
    const itemName = e.target.value;
    setFoodItemName(itemName);
    const item = foodItems.find(foodItem => foodItem.itemName === itemName);
    setSelectedFoodItem(item || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/FitnessTracker/nutrition', {
        userId,
        mealType,
        foodItems: [
          {
            itemName: foodItemName,
            quantity: Number(quantity),
            calories: selectedFoodItem ? selectedFoodItem.calories : 0,
            macros: selectedFoodItem ? selectedFoodItem.macros : { carbs: 0, proteins: 0, fats: 0 },
          }
        ],
        logDate: new Date(),
      });

      setLogs([response.data, ...logs]);
      setFoodItemName('');
      setQuantity('');
      setSelectedFoodItem(null);
    } catch (error) {
      console.error('Error submitting new nutrition log:', error.response ? error.response.data : error.message);
    }
  };

  const calculateTotals = () => {
    return logs.reduce((totals, log) => {
      if (log.foodItems) {
        log.foodItems.forEach(item => {
          totals.calories += item.calories * item.quantity;
          totals.carbs += item.macros.carbs * item.quantity;
          totals.proteins += item.macros.proteins * item.quantity;
          totals.fats += item.macros.fats * item.quantity;
        });
      }
      return totals;
    }, { calories: 0, carbs: 0, proteins: 0, fats: 0 });
  };
  

  const totals = calculateTotals();

  return (
    <div className="container nutrition text-center mt-4">
      <div className="row justify-content-center">
        {/* Food Item List Section */}
        <div className="col-md-6">
          <FoodItemList foodItems={foodItems} mealType={mealType} />
        </div>

        {/* Form Section */}
        <div className="col-md-6">
          <h3>Add New Log</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Meal Type</label>
              <select
                className="form-control"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>

            <div className="form-group">
  <label>Food Item</label>
  <select
    className="form-control"
    value={foodItemName}
    onChange={handleFoodItemChange}
    required
  >
    <option value="">Select a food item</option>
    {foodItems.length > 0 ? (
      foodItems
        .filter(item => item.category.toLowerCase() === mealType) // Filter by category
        .map(item => (
          <option key={item.itemName} value={item.itemName}>
            {item.itemName}
          </option>
        ))
    ) : (
      <option value="">No food items available</option>
    )}
  </select>
</div>


            {selectedFoodItem && (
              <div className="form-group">
                <label>Selected Food Item Details</label>
                <div>
                  <p><strong>Item:</strong> {selectedFoodItem.itemName}</p>
                  <p><strong>Calories:</strong> {selectedFoodItem.calories || 0} cal</p>
                  <p><strong>Carbs:</strong> {selectedFoodItem.macros?.carbs || 0}g</p>
                  <p><strong>Proteins:</strong> {selectedFoodItem.macros?.proteins || 0}g</p>
                  <p><strong>Fats:</strong> {selectedFoodItem.macros?.fats || 0}g</p>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mt-3">Add Log</button>
          </form>
        </div>
      </div>


   {/* Display Totals */}
   <div className="row mt-4">
  <div className="col-md-12">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Total Intake</h4>
        <p><strong>Calories:</strong> {totals.calories} cal</p>
        <p><strong>Carbs:</strong> {totals.carbs} g</p>
        <p><strong>Proteins:</strong> {totals.proteins} g</p>
        <p><strong>Fats:</strong> {totals.fats} g</p>
      </div>
    </div>
  </div>
</div>


      {/* Display new entries as cards */}
      <div className="row mt-4">
    {logs.map(log => (
        <div className="col-md-4" key={log._id}>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{log.mealType?.charAt(0).toUpperCase() + log.mealType?.slice(1) || 'N/A'}</h5>
                    <table className="table table-sm">
                        <tbody>
                            {log.foodItems && log.foodItems.length > 0 ? (
                                log.foodItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.itemName || 'N/A'}</td>
                                        <td>{item.quantity || 'N/A'}</td>
                                        <td>{item.calories || 0} cal</td>
                                        <td>Carbs: {item.macros?.carbs || 0}g</td>
                                        <td>Proteins: {item.macros?.proteins || 0}g</td>
                                        <td>Fats: {item.macros?.fats || 0}g</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6">No food items</td></tr>
                            )}
                        </tbody>
                    </table>
                    <p className="card-text">Date: {new Date(log.logDate).toLocaleDateString() || 'N/A'}</p>
                </div>
            </div>
        </div>
    ))}
</div>

    </div>
  );
};

export default NutritionPage;