import './App1.css'

// Import React components:
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from './components/Navigation.jsx';

// Import Pages:
import Home_Page from './pages/Home_Page.jsx';
import Meal_History_Page from './pages/Meal_History_Page.jsx';
import Exercise_History_Page from './pages/Exercise_History_Page.jsx';
import Calorie_Summary_Page from './pages/Calorie_Summary_Page.jsx';
import Find_Meal_Page from './pages/Find_Meal_Page.jsx';
import Find_Activity_Page from './pages/Find_Activity_Page.jsx';
import Confirmation_Page from './pages/Confirmation_Page.jsx';
import Login_Page from './pages/Login_Page.jsx';
import Settings_Page from './pages/Settings_Page.jsx';
import Feedback_Form_Page from './pages/Feedback_Form_Page.jsx';
import View_Feedback_Page from './pages/View_Feedback_Page.jsx';

function App() {

    const [selected, setEntryOpToUse] = useState([]);     // holds meal in question
    const [user, setUser] = useState('');                 // holds user data

    // GETS ALL LOCKED BADGES:
    const getBadges = async () => {                                                           //-------------------------------------REACHED
        const response = await fetch('/badge_service_cal');     // get all badges
        const badges_found = await response.json();
        return badges_found;
    };

    // GETS ALL ENTRIES:    
    const getEntries = async () => {                                                                //-------------------------------------REACHED
        const response = await fetch(`/calories`);                                // get all entries
        const all_entries = await response.json();
        let sorted_entries = all_entries.sort((a, b) => {                           // sort entries
            return new Date(b.date) - new Date(a.date);
        });
        return sorted_entries;
    };

    // CHECKS BADGES, ENTRIES, AND UNLOCK CONDITIONS:                                               -------------------------------------REACHED
    const update_badges = async () => {         // get data and check if change
        let badges = await getBadges();
        let entries = await getEntries();
        checkConditions(badges, entries);
    }

    // CHECK CONDITIONS FOR BADGES:                                                             -------------------------------------REACHED
    const checkConditions = (badges, entries) => {
        const today_date = (new Date()).toISOString();              // set up variables
        const month = parseInt((today_date.slice(5, 7)), 10);
        const today = parseInt((today_date.slice(8, 10)), 10);

        const m_result_bool = checkMonth(today, month, entries);        // check months
        let m_result = 0;
        const range = limitAdjust(today, month);                        // get range of current week
        const w_result_data = getEntryCount(entries, month, range);          // get count of entries in week
        
        if (m_result_bool){     // if month check passed, set to 4
            m_result = 4;
        } 
        check_badges(badges, m_result, w_result_data[0], w_result_data[1]);
    }

    // UPDATE COMPLETED BADGES OR REVOKED BADGES:                                         
    const check_badges = (badges, m_result, w_result_count, w_result_sum) => {      
        let unlocked_badges = badges.filter (badge => badge.unlocked);
        let locked_badges = badges.filter (badge => !badge.unlocked);
        locked_badges.forEach((badge) => {  
            if (badge.goalType.includes("daily_calories")){             // if yes, update
                if (Math.abs(w_result_sum) >= Math.abs(badge.goalInt)) {
                    const update = { unlocked: true }
                    updateBadge(badge.badgeId, update);
                }
            } else if (!badge.unlocked && badge.goalType.includes("regular_exercise")){
                if ((badge.goalType).includes("week")){
                    if (w_result_count >= badge.goalInt) {
                        const update = { unlocked: true }
                        updateBadge(badge.badgeId, update);
                    }
                } else if (badge.goalType.includes("month")){
                    if (m_result >= badge.goalInt){
                        const update = { unlocked: true }
                        updateBadge(badge.badgeId, update);
                    }
                }
            } 
        });
        unlocked_badges.forEach((badge) => {
            if (badge.goalType.includes("daily_calories")){
                if (Math.abs(w_result_sum) < Math.abs(badge.goalInt)) {
                    const update = { unlocked: false }
                    updateBadge(badge.badgeId, update);
                }
            } else if (badge.goalType.includes("regular_exercise")) {
                if ((badge.goalType).includes("week")){
                    if (w_result_count < badge.goalInt) {
                        const update = { unlocked: false }
                        updateBadge(badge.badgeId, update);
                    }
                } else if (badge.goalType.includes("month")){
                    if (m_result < badge.goalInt){
                        const update = { unlocked: false }
                        updateBadge(badge.badgeId, update);
                    }
                }
            }
        });
    };

    // SETS WEEK RANGE FOR CHECKS:
    const limitAdjust = (day, month) => {       // determine range of week              -------------------------------------REACHED
        const prior_entry_month = month - 1;
        const week_start_num = day - 6;
        const week_end_num = day;
        let week_start;
        let week_end;
        let month_direction=0;              // 0=same month, -1=moves backward
        if (day <= 6){        // if today is beginning of month
            if (prior_entry_month === 1 || prior_entry_month === 3 || prior_entry_month === 5 ){    // 31 days
                week_start = 31 + week_start_num;
                week_end = week_end_num;
                month_direction = -1;
            } else if (prior_entry_month === 7 || prior_entry_month === 8 || prior_entry_month === 10 || prior_entry_month === 12) { // 31 days
                week_start = 31 + week_start_num;
                week_end = week_end_num;
                month_direction = -1;
            } else if (prior_entry_month === 4 || prior_entry_month == 6 || prior_entry_month === 9 || prior_entry_month === 11){ // 30 days
                week_start = 30 + week_start_num;
                week_end = week_end_num;
                month_direction = -1;
            } else if (prior_entry_month === 2) {  // 28 days 
                week_start = 28 + week_start_num;
                week_end = week_end_num;
                month_direction = -1;
            }
        } else {                                    // if today is middle of month
            week_start = week_start_num;
            week_end = week_end_num;
            month_direction = 0;
        }
        const range = [week_start, week_end, month_direction];
        return range;
    };

    // CHECKS MONTH BADGE CONDITIONS:                                                           -------------------------------------REACHED
    const checkMonth = (today, month, entries_to_check) => {
        let day = today;                // start w/ today date
        let wk1_count, wk2_count, wk3_count, wk4_count = 0; // init counters
        for(let i=0; i < 4; i++){       // count occurances in month
            if (i === 0){
                let wkRange = limitAdjust(day, month);      // get week dates
                const wk1_count_data = getEntryCount(entries_to_check, month, wkRange);         // count occurances in range
                wk1_count = wk1_count_data[0];
            } else if (i === 1) {
                let wkRange = limitAdjust(day, month);
                const wk2_count_data = getEntryCount(entries_to_check, month, wkRange);
                wk2_count = wk2_count_data[0];
            } else if (i === 2 ) {
                let wkRange = limitAdjust(day, month);
                const wk3_count_data = getEntryCount(entries_to_check, month, wkRange);
                wk3_count = wk3_count_data[0];
            } else {
                let wkRange = limitAdjust(day, month);
                const wk4_count_data = getEntryCount(entries_to_check,  month, wkRange);
                wk4_count = wk4_count_data[0];
            }
            day = day - 7;        // increment for next week
            if (day < 1 && (month === 2 || month === 4 || month === 6 || month === 8 || month === 9 || month === 11 || month === 1)){
                day = 31 + day;
                month -= 1;
            } else if (day < 1 && (month === 5 || month === 7 || month === 10 || month === 12)){
                day = 30 + day;
                month -= 1;
            } else if (day < 1 && (month === 3)){
                day = 28 + day;
                month -= 1;
            };
        }
        if (wk1_count > 0 && wk2_count > 0 && wk3_count > 0 && wk4_count > 0){  // check weeks of the month
            return true;
        } else {
            return false;
        }
    };

    // CHECKS DAILY BADGE CONDITIONS:                                                                                   -------------------------------------REACHED
    const getEntryCount = (entries_to_check, month, wkRange) => {        // count occurances in week
        let count = 0;
        let prev_month = month - 1;
        let sum = 0;
        let daysCounted = new Set();
        entries_to_check.forEach((entry) => {
            if (entry.calories < 0){
                let curr_day = parseInt((entry.date.slice(8,10)), 10);
                let curr_month = parseInt((entry.date.slice(5,7)), 10);
                if (wkRange[0] > wkRange[1]){
                    if (curr_month === prev_month && wkRange[2] === -1 && curr_day >= wkRange[0]){       // if in range, past overlap
                        if (!(daysCounted.has(curr_day))){
                            count ++;
                            sum += entry.calories;
                            daysCounted.add(curr_day);
                        } 
                    } 
                } else if (curr_month === month && curr_day >= wkRange[0] && curr_day <= wkRange[1] && wkRange[2] === 0){       // if in normal range
                    if (!(daysCounted.has(curr_day))){
                        count ++;
                        sum += entry.calories;
                        daysCounted.add(curr_day);
                    }
                }
            }
        }); 
        const count_data = [count, sum];
        return count_data;                                   // send total counted days in the week
    };

    // UPDATES BADGE W/PUT REQUEST:
    const updateBadge = async (b_id, update) => {           // update badge by ID, reset locked useState
        const response = await fetch(
            `/badge_service_cal/${b_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(update)
            }
        );
        if(response.status === 200 && update.unlocked) {
            alert('Successfully unlocked the badge!');
            getBadges();
            window.location.reload();
        } else if(response.status === 200 && !update.unlocked) {
            alert('Badge removed due to missing requirement.');
            getBadges();
            window.location.reload();
        }else {
            alert(`Failed to unlock the badge, status code = ${response.status}`);
        }
    };

    useEffect(() => {                                                      // load badge data
        getBadges();
        getEntries();
        update_badges();
    }, []);

    return (            
        <div className="app" id="screen">
            <Router>
                <Navigation />
                    <Routes>
                        <Route path= "/" element={<Login_Page setUser={setUser}/>}></Route>
                        <Route path = "/home" element={<Home_Page />}></Route>
                        <Route path = "/settings" element={<Settings_Page user={user} setUser={setUser} />}></Route>
                        <Route path = "/meal-history" element={<Meal_History_Page />}></Route>
                        <Route path = "/activity-history" element={<Exercise_History_Page checkBadges={update_badges}/>}></Route>
                        <Route path = "/calorie-summary" element={<Calorie_Summary_Page />}></Route>
                        <Route path = "/find-a-meal" element={<Find_Meal_Page setMealToUse={setEntryOpToUse} />}></Route>
                        <Route path = "/find-an-activity" element={<Find_Activity_Page setExerciseToUse={setEntryOpToUse} />}></Route>
                        <Route path = "/confirm-entry" element={<Confirmation_Page selected={selected} checkBadges={update_badges} />}></Route>
                        <Route path = "/feedback" element={<Feedback_Form_Page />}></Route>
                        <Route path = "/view-feedback" element={<View_Feedback_Page />}></Route>
                    </Routes> 
            </Router>
            <ToastContainer />
            <footer>© 2025 Kelsey Shanks</footer>
        </div>
    );
}

export default App;