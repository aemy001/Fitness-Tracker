import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/FitnessTracker/users/login",
        {
          email,
          password,
        }
      );

      // Store token in localStorage
      localStorage.setItem("authToken", response.data.token);

      // Call login function to update auth context
      login(response.data.user); // Pass user data if needed

      // Navigate to dashboard
      navigate("/dashboard");

      // Show success message
      toast.success("Login successful");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login mb-3">
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
              <h2 className="login-heading text-center mb-4">
                Login to Your Account
              </h2>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  id="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <Link className="frg" to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-custom btn-lg btn-block">
                Sign in
              </button>

              <hr />

              <div className="row d-inline-block justify-content-md-evenly mb-4">
                <p>
                  Don't Have an Account? &nbsp;{" "}
                  <Link className="frg" to="/signup">
                    Create an account now
                  </Link>
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

export default Login;
