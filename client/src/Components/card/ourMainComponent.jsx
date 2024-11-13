import React, { useState, useEffect } from 'react';
import Card from './Card';
import { jwtDecode } from 'jwt-decode';

const MainComponent = () => {
  const [totals, setTotals] = useState({ carbs: 0, proteins: 0, fats: 0, calories: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchNutritionData = async () => {
      if (!token) return;

      const decodedToken = jwtDecode(token);

      try {
        const response = await fetch(`http://localhost:5000/FitnessTracker/nutrition/user/${decodedToken.userId}`);
        if (!response.ok) throw new Error('Failed to fetch nutrition data');

        const data = await response.json();


        
        const newTotals = data.reduce((acc, item) => {
          item.foodItems.forEach(food => {
            acc.carbs += food.macros.carbs * food.quantity;
            acc.proteins += food.macros.proteins * food.quantity;
            acc.fats += food.macros.fats  * food.quantity;
            acc.calories += food.calories  * food.quantity;
          });
          return acc;
        }, { carbs: 0, proteins: 0, fats: 0, calories: 0 });

        setTotals(newTotals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [token]);

  return (
    <div className="row mt-3">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && (
        <>
          <div className="col-xl-3 col-md-6">
            <Card
              title={`${totals.calories} kcal`}
              content="Total Calories"
              icon="fas fa-utensils"
              backgroundColor="#e85c53"
            />
          </div>
          <div className="col-xl-3 col-md-6">
            <Card
              title={`${totals.carbs} g`}
              content="Total Carbs"
              icon="fas fa-bread-slice"
              backgroundColor="#e85c53"
            />
          </div>
          <div className="col-xl-3 col-md-6">
            <Card
              title={`${totals.proteins} g`}
              content="Total Proteins"
              icon="fas fa-drumstick-bite"
              backgroundColor="#e85c53"
            />
          </div>
          <div className="col-xl-3 col-md-6">
            <Card
              title={`${totals.fats} g`}
              content="Total Fats"
              icon="fas fa-apple-alt"
              backgroundColor="#e85c53"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MainComponent;
