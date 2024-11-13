import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
function Roundchart() {
    const [caloriesData, setCaloriesData] = useState([0, 0]);
    const [isLoading, setIsLoading] = useState(true);

    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart) {
            const { ctx } = chart;
            ctx.save();
            ctx.font = 'bolder 20px san-serif';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${caloriesData[0]} cal`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
            ctx.restore();
        }
    };

    useEffect(() => {
        const fetchCaloriesData = async () => {
            try {


              const token = localStorage.getItem('authToken');
              const decodedToken = jwtDecode(token);

                const response = await axios.get(`http://localhost:5000/FitnessTracker/workouts/user/${decodedToken.userId}`); 
                const workouts = response.data;

                const totalCalories = workouts.reduce((acc, workout) => acc + (workout.caloriesBurned || 0), 0);
                const caloriesBurned = workouts.map(workout => workout.caloriesBurned || 0);
                console.log("Total Calories:", totalCalories); 
                console.log("Calories Burned Array:", caloriesBurned); 
                setCaloriesData([totalCalories, 100 - totalCalories]);
            } catch (error) {
                console.error("Error fetching workouts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaloriesData();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="container">
                <div className="card mb-4">
                    <div className="card-header">
                        <h4>Average calories burned</h4>
                    </div>
                    <div className="card-body">
                        <Doughnut
                            data={{
                                labels: ['Calories Burned', 'Remaining'],
                                datasets: [{
                                    label: "Calories",
                                    data: caloriesData,
                                    backgroundColor: ['#e5ecf6', '#e85c53'],
                                    hoverOffset: 4,
                                }]
                            }}
                            options={{
                                maintainAspectRatio: false,
                                responsive: false,
                            }}
                            plugins={[textCenter]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roundchart;