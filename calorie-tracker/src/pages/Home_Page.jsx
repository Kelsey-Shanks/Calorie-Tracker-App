import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Calorie_Daily_Summary from '../components/Calorie_Daily_Summary.jsx';
import Meal_History_Nav from '../components/Meal_History_Nav.jsx';
import Exercise_History_Nav from '../components/Exercise_History_Nav.jsx';
import Calorie_Overview_Nav from '../components/Calorie_Overview_Nav.jsx';
import Home_Message from '../components/Home_Message.jsx';
import Badges_Display from '../components/Badges.jsx';

function Home_Page() { // date created and sent

    const [calorie_sum, setCalTotal] = useState([]);                    // CALORIE TOTAL (int)
    const navigate = useNavigate();

    const loadData = async () => {
        // FETCH TODAY DATA:
        const today_date = makeDateString((new Date()).toISOString());                 // WILL USE OFFICIALLY
        const response = await fetch(`/calories?date=${today_date}`);     // get today's meals
        const today_entries = await response.json();

        // set sums to 0 if no data:
        if (today_entries === undefined || today_entries.length < 1) {              // ------------IF NONE TODAY----------------
            setCalTotal(0);                        
        } else {                                                                    // ------------IF SOME TODAY----------------
            //const today_sum = today_entries.reduce((sum, entry) => sum + entry.calories, 0);   // sum today and set
            const today_calories = today_entries.map(entry => entry.calories);
            const result = sumCalories(today_calories);
            setCalTotal(result);
        }
    }

    const sumCalories = async (calories) => {
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

    useEffect(() => {                                                           // load data
        loadData();
    }, []);

    const toMealHistory = async () => {                                         // navigate button Meal_History_Nav
        navigate('/meal-history');
    }

    const toCalorieSummary = async () => {                                      // navigate button Calorie_Overview_Nav
        navigate('/calorie-summary');
    }

    const toExerciseHistory = async () => {
        navigate('/activity-history');
    }

    const toFeedback = async () => {
        navigate('/feedback');
    }

    const toViewFeedback = async () => {
        navigate('/view-feedback');
    }

    return (  // calories summed and sent, sent nav functions to buttons.
        <>
            <h2>Home</h2>
            <Calorie_Daily_Summary calorie_sum={calorie_sum} />             
            <Meal_History_Nav toMealHistory={toMealHistory}/>
            <br></br>
            <Exercise_History_Nav toExerciseHistory={toExerciseHistory}/>
            <br></br>
            <Calorie_Overview_Nav toCalorieSummary={toCalorieSummary}/>
            <Home_Message />
            <Badges_Display />
            <button onClick={e => {
                toFeedback();
            }}>Feedback</button>
            <br/>
            <button onClick={e => {
                toViewFeedback();
            }}>Access Feedback</button>
        </>
    );
}

export default Home_Page;