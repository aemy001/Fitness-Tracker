import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { jwtDecode } from 'jwt-decode';
const Charts = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [calorieData, setCalorieData] = useState({ labels: [], values: [] });

  useEffect(() => {
   
    const fetchCalorieData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const decodedToken = jwtDecode(token);

        const response = await fetch(`http://localhost:5000/FitnessTracker/nutrition/user/${decodedToken.userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        
        const calorieMap = data.reduce((acc, item) => {
          const date = new Date(item.logDate).toLocaleDateString();
          item.foodItems.forEach(food => {
            const totalCalories = food.quantity * (food.calories || 0);
            acc[date] = (acc[date] || 0) + totalCalories;
          });
          return acc;
        }, {});

        const labels = Object.keys(calorieMap);
        const values = Object.values(calorieMap);
        setCalorieData({ labels, values });
      } catch (error) {
        console.error("Error fetching calorie data:", error);
      }
    };

    fetchCalorieData();
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current && calorieData.labels.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: calorieData.labels,
          datasets: [{
            label: "Daily Calorie Intake",
            data: calorieData.values,
            fill: false,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "#e85c53",
            pointRadius: 5,
            pointBackgroundColor: "#e85c53",
            pointBorderColor: "#e85c53",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#e85c53",
            pointHitRadius: 50,
            pointBorderWidth: 2,
          }],
        },
        options: {
          scales: {
            x: {
              type: 'category', 
              grid: {
                display: false
              },
            },
            y: {
              beginAtZero: true,
              suggestedMax: Math.max(...calorieData.values) + 100, 
              ticks: {
                stepSize: 100,
                maxTicksLimit: 5
              },
              grid: {
                color: "rgba(0, 0, 0, .1)"
              }
            }
          },
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleFontColor: "#fff",
              bodyFontColor: "#fff",
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.raw !== undefined 
                    ? `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()} calories` 
                    : '';
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0.3
            }
          },
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); 
      }
    };
  }, [calorieData]);

  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-header">
          <h4>Daily Calorie Intake</h4>
        </div>
        <div className="card-body">
          {calorieData.labels.length > 0 ? (
            <canvas id="myAreaChart" width="100%" height="150" ref={chartRef}></canvas>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;