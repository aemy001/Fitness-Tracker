import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FoodItemList = ({ mealType }) => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/FitnessTracker/fooditems');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  // Filter food items based on the mealType
  const filteredFoodItems = mealType ? foodItems.filter(item => item.category.toLowerCase() === mealType) : foodItems;

  return (
    <div className="container mt-4">
      <h3>Food Items for {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
      <table className="table table-light">
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Calories</th>
            <th>Carbs (g)</th>
            <th>Proteins (g)</th>
            <th>Fats (g)</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredFoodItems.length > 0 ? (
            filteredFoodItems.map(item => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{item.calories}</td>
                <td>{item.macros.carbs}</td>
                <td>{item.macros.proteins}</td>
                <td>{item.macros.fats}</td>
                <td>{item.category || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6">No food items available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
