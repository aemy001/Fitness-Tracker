import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Uppernav from "./Components/upperNav/Uppernav";
import Login from "./Components/login/Login";
import Footer from "./Components/Footer/Footer";
import Signup from "./Components/signup/Signup";
import Userprofile from "./Pages/UserProfile/Userprofile";
import Logout from "./Components/logout/logout";
import NutritionPage from "./Pages/NutritionPage/NutritionPage";
import WorkoutPage from "./Pages/Workout/Workout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Uppernav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
