// CHECKED AND LOOKS CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import '../App.css';

// Creates the meal history navigation button on home page

function Meal_History_Nav( {toMealHistory}) {   // navigation function sent here

    return (
        <>
            <button onClick={e => {
                e.preventDefault();             // prevent default functions
                toMealHistory();                // navigate function used
            }}
            >Meal History</button>
        </>
    );
}

export default Meal_History_Nav;
