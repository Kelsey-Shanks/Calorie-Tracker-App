import './App.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import Home_Page from './pages/Home_Page.jsx';
import Meal_History_Page from './pages/Meal_History_Page.jsx';
import Exercise_History_Page from './pages/Exercise_History_Page.jsx';
import Calorie_Summary_Page from './pages/Calorie_Summary_Page.jsx';
import Find_Meal_Page from './pages/Find_Meal_Page.jsx';
import Find_Activity_Page from './pages/Find_Activity_Page.jsx';
import Confirmation_Page from './pages/Confirmation_Page.jsx';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    const [selected, setEntryOpToUse] = useState([]);     // holds meal in question

    return (            
        <div className="app" id="screen">
            <Router>
                <Navigation />
                <Routes>
                    <Route path = "/" element={<Home_Page  />}></Route>
                    <Route path = "/meal-history" element={<Meal_History_Page />}></Route>
                    <Route path = "/activity-history" element={<Exercise_History_Page />}></Route>
                    <Route path = "/calorie-summary" element={<Calorie_Summary_Page />}></Route>
                    <Route path = "/find-a-meal" element={<Find_Meal_Page setMealToUse={setEntryOpToUse} />}></Route>
                    <Route path = "/find-an-activity" element={<Find_Activity_Page setExerciseToUse={setEntryOpToUse} />}></Route>
                    <Route path = "/confirm-entry" element={<Confirmation_Page selected={selected} />}></Route>
                </Routes>
            </Router>
            <ToastContainer />
            <footer>© 2025 Kelsey Shanks</footer>
        </div>
    );
}

export default App;