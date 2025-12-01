// CHECKED AND LOOKS CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Calorie_Count_Activity from '../components/Calorie_Count_Activity.jsx';
import Table_View from '../components/Table_View.jsx';
import Add_Exercise_Button from '../components/Add_Exercise_Button.jsx';
import Table_Edit from '../components/Table_Edit.jsx';

function Exercise_History_Page ( { checkBadges }) {

    const [exercise_sum, setExerciseTotal] = useState([]);              // ACTIVITY SUM (int)
    const [exercise_entries, setExercises] = useState([]);              // ACTIVITIES (object arr)
    const [edit_status, setEditStatus] = useState(false);               // EDIT ON OR OFF (bool)
    const [unique_dates, setUniqueDates] = useState([]);                    // UNIQUE DATES (string arr)
    const navigate = useNavigate();

    const loadData = async () => {
        // FETCH TODAY DATA FOR SUM:
        const today_date = makeDateString((new Date()).toISOString());                 // WILL USE OFFICIALLY
        const response1 = await fetch(`/calories?date=${today_date}&type=exercise`);     // get today's meals
        const today_entries = await response1.json();

        // FETCH ALL MEALS FOR TABLES:
        const response2 = await fetch(`/calories?type=exercise`);                        // get all meals
        const all_e_entries = await response2.json();
        let sorted_entries = all_e_entries.sort((a, b) => {                         // get recent date
            return new Date(b.date) - new Date(a.date);
        });

        // SET USE-STATES:
        if (today_entries === undefined || today_entries.length < 1) {              // ------------IF NONE TODAY----------------
            setExerciseTotal(0);
            setExercises(sorted_entries);                      
        } else {                                                                    // ------------IF SOME TODAY----------------
            //const today_sum = today_entries.reduce((sum, entry) => sum + entry.calories, 0);   // sum today and set
            const e_calories = today_entries.map(entry => entry.calories);
            const result = sumECalories(e_calories);
            setExerciseTotal(result);
            setExercises(sorted_entries);
        }

        // GET UNIQUE DATES:
        const dates_w_data = sorted_entries.map(entry => makeDateString(entry.date));        // get all dates YYYY-MM-DD
        const dates_arr = Array.from(new Set(dates_w_data));                                // get unique dates
        setUniqueDates(dates_arr);
    }

    const sumECalories = async (calories) => {
        // SUM USING MICROSERVICE:
        const SUMMATION_MICROSERVICE_URL = "https://sum-calculation-144095947632.us-west2.run.app";
        
        const response = await fetch(
            `${SUMMATION_MICROSERVICE_URL}/sum-calculation`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ num_list: calories }),
            }
        );
        if (!response.ok) {
            alert(`Failed to add calorie entry, status code = ${response.status}`);
            return
        } else {
            const result = await response.json();
            return result.sum;
        }
    }

    // CONVERT DATE to YYYY-MM-DD format:
    const makeDateString = (date) => {      
        const stringDate = date.slice(0, 10) 
        return stringDate;
    }

    useEffect(() => {                                                                   // load data
        loadData();                         
    }, []);

    const toSearch = () => {                                                            // navigate function for Add__Meal_Button
        navigate("/find-an-activity");  // need to implement
    }

    const toEdit = () => {
        setEditStatus(true);
    }

    const toView = () => {
        setEditStatus(false);
    }

    const onDelete = async (id) => {
        const response = await fetch(
            `/calories/${id}`,
            {method: 'DELETE'}
        );
        if(response.status === 204){
            setExercises(exercise_entries.filter(e => e.id !== id));
            checkBadges();
        } else {
            alert(`Failed to delete exercise entry with id = ${id}, status code = ${response.status}`);
        }
        window.location.reload();      
    }

    if (edit_status === false) {    // load view table
        return (   
        <>
            <h2>Activity History</h2>
            <Calorie_Count_Activity exercise_sum={exercise_sum}/>   
            <Add_Exercise_Button toSearch={toSearch}/>
            <div>
                {unique_dates.map((date_p, i) => (
                    <Table_View key={i} date_p={date_p} entries={exercise_entries} 
                    toEdit={toEdit}/>
                ))}
            </div>       
        </>
        );
    } else if (edit_status === true) {  // load edit table
        return ( 
        <>
            <h2>Activity History</h2>
            <Calorie_Count_Activity exercise_sum={exercise_sum} />   
            <Add_Exercise_Button toSearch={toSearch} />
            <div>
                {unique_dates.map((date_p, i) => (
                    <Table_Edit key={i} date_p={date_p} entries={exercise_entries} 
                    toSearch={toSearch} toView={toView} onDelete={onDelete}/>
                ))}
            </div>       
        </>
        );
    }
}

export default Exercise_History_Page;