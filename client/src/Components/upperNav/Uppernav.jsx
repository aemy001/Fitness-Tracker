import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./uppernav.css";

function Uppernav() {
  const { user, logout } = useAuth(); // Get user and logout function from context

  return (
    <nav className="navbar navbar-expand-lg bg-black navbar-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Fitness Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-ltr" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-ltr" to="/nutrition">
                    Nutrition Log
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-ltr" to="/workout">
                    Workout
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-ltr" to="/userprofile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link nav-link-ltr"
                    to="/logout"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-ltr" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-ltr" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Uppernav;
