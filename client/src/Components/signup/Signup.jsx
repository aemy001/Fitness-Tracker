import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [file, setFile] = useState(null);

  const checkUsernameUnique = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/FitnessTracker/users/check-username/${username}`
      );
      return response.data.isUnique;
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      return false;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isUnique = await checkUsernameUnique(userName);
    if (!isUnique) {
      toast.error("Username is already taken. Please choose another one.");
      return;
    }

    const data = new FormData();
    data.append("username", userName);
    data.append("email", userEmail);
    data.append("password", userPassword);
    if (file) {
      data.append("profilePicture", file);
    }

    const config = {
      method: "post",
      url: "http://localhost:5000/FitnessTracker/users/signup",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    try {
      await axios.request(config);
      toast.success("User Registered");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("User Not Registered");
    }
  };

  return (
    <div className="vh-100 signup">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6 d-none d-lg-block">
            <img
              src="https://img.freepik.com/premium-photo/body-builder-wearing-blue-tshirt-holding-dumbbells-his-hand-white-background-v-6-job-id-571_1107779-29728.jpg?size=626&ext=jpg&ga=GA1.1.1206952653.1726832860&semt=ais_hybrid"
              className="img-fluid login-image"
              alt=" image"
            />
          </div>
          <div className="col-md-12 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleFormSubmit}>
              <h2 className="signup-heading text-center mb-4">
                Create Your Account
              </h2>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="username">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e) => setUserName(e.target.value)}
                  id="username"
                  className="form-control form-control-lg"
                  required
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => setUserEmail(e.target.value)}
                  id="email"
                  className="form-control form-control-lg"
                  required
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setUserPassword(e.target.value)}
                  id="password"
                  className="form-control form-control-lg"
                  required
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="fileInput">
                  Upload your Avatar image
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="form-control form-control-lg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <button type="submit" className="btn btn-custom btn-lg btn-block">
                Register
              </button>
              <hr />
              <div className="row d-inline-block justify-content-md-evenly mb-4">
                <p>
                  Already Have an Account? &nbsp;{" "}
                  <Link className="frg" to="/login">
                    Click here!
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
