// CHECKED AND LOOKS CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import '../App.css';

// creates the calorie overview navigation button on home page

function Calorie_Overview_Nav( {toCalorieSummary} ) {    // navigate function sent here

    return (
        <>
            <button onClick={e => {
                e.preventDefault();                     // prevent default function
                toCalorieSummary();                     // navigate function used
            }}                    
            >Calorie Summary</button>   
        </>
    );
}

export default Calorie_Overview_Nav;
