import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../Components/card/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressChart from "../../Components/progress/ProgressChart";
import Notifications from "../../Components/Notification/Notification";
import "./Userprofile.css";
import { jwtDecode } from "jwt-decode";
const Userprofile = () => {
  const [user, setUser] = useState({
    profilePicture: '',
    username: '',
    email: '',
    age: '',
    height: '',
    weight: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(user);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [dailyCalorieIntake, setDailyCalorieIntake] = useState(0);


 
 
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
     
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.userId;
    }
    return null;
  };
  
  const userId = getUserIdFromToken();
        const response = await axios.get('http://localhost:5000/FitnessTracker/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
        setEditUser(response.data);

const workoutsResponse = await axios.get(`http://localhost:5000/FitnessTracker/workouts/user/${userId}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

setTotalWorkouts(workoutsResponse.data.length); 
console.log(workoutsResponse.data.length); 

const nutritionResponse = await axios.get(`http://localhost:5000/FitnessTracker/nutrition/user/${userId}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

setDailyCalorieIntake(nutritionResponse.data.length);

      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`http://localhost:5000/FitnessTracker/users/update/${user._id}`, editUser, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(editUser);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="container profile mt-4">
      <div className="row">
        {/* User Profile Info Card */}
        <div className="col-md-4">
          <div className="card">
            <img
              src={
                user.profilePicture ||
                "https://static.vecteezy.com/system/resources/previews/002/002/253/non_2x/beautiful-woman-wearing-sunglasses-avatar-character-icon-free-vector.jpg"
              }
              alt="Profile"
              className="card-img-top rounded-circle"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                margin: "20px auto",
              }}
            />
            <div className="card-body text-center">
              <h4 className="card-title">{user.username}</h4>
              <p className="card-text">{user.email}</p>
              <p className="card-text">Age: {user.age}</p>
              <p className="card-text">Height: {user.height}</p>
              <p className="card-text">Weight: {user.weight}</p>
              <button
                className="btn mt-2"
                style={{ backgroundColor: "#e85c53", color: "white" }}
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Activity Overview Section */}
        <div className="col-md-8">
          <h4>Activity Overview</h4>
          <Notifications userId={user._id} />
          <div className="row">
            <div className="col-md-6">
              <Card
                title="Recent Workouts"
                content={`${totalWorkouts} Workouts added`} 
                icon="bi bi-bicycle"
                backgroundColor="#e85c53"
                showEditButton={false}
              />
            </div>
            <div className="col-md-6">
              <Card
                title="Nutrition Log"
                content={`Nutritions added : ${dailyCalorieIntake}`} 
                icon="bi bi-egg-fried"
                backgroundColor="#fd7e14"
                showEditButton={false}
              />
            </div>
          </div>

          {/* Progress Chart inside Activity Overview */}
          <div className="row mt-4">
            <div className="col-12">
              {/* <ProgressChart /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Modal to Edit Profile */}
      {showModal && (
        <div className="modal show d-block " tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editUser.username}
                      onChange={(e) =>
                        setEditUser({ ...editUser, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={editUser.email}
                      onChange={(e) =>
                        setEditUser({ ...editUser, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editUser.age}
                      onChange={(e) =>
                        setEditUser({ ...editUser, age: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Height</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editUser.height}
                      onChange={(e) =>
                        setEditUser({ ...editUser, height: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Weight</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editUser.weight}
                      onChange={(e) =>
                        setEditUser({ ...editUser, weight: e.target.value })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#e85c53", color: "white" }} // Orange Save Changes button
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userprofile;
