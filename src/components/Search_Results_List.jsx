import '../App.css';
import { useState, useEffect } from 'react';


// ********* Used tutorial from https://builtin.com/articles/react-search-bar to build this search function
// the aforementioned tutorial was written by Saleh Mubashar on May 13, 2025  ************************

function Search_Results_List ( {input_search, setMealToUse, setConfirmationMess} ) {       // meal_options = matches, onSelect function sets user choice

    const [all_meals, setAllMeals] = useState([]);

    // FETCH ALL MEALS:
    const getMealOptions = async () => {
        const response = await fetch('/selections?type=meal');
        const meal_options = await response.json();
        setAllMeals(meal_options);
    }
    
    // SET MATCHES FOR TABLE:
    const matches = all_meals.filter((option) => {
        if(input_search === "") {
            return option;
        } else {
            return option.name.toLowerCase().includes(input_search);
        }
    })

    useEffect(() => {                                                                       // load data
        getMealOptions();                     
    }, []);

    return ( // maps each option into table row, includes radio button for row, and sends onSelect to row
        <>
            <ul id="match-options">
                {matches.map((result, i) => (           // maps out matches and creates radios for each row
                    <li key={i}>
                        <img src={result.image} width="50" height="50"/> 
                            <button id="find-options-btns" onClick={e => {    // button selects entry
                                e.preventDefault();                         // prevent default behavior
                                setMealToUse(result);                       // function selects JSON object (dispalyed name) 
                                setConfirmationMess(`${result.name} has been selected.`);      
                            }}>{result.name}</button>   
                    </li>
                ))}
            </ul>
        </>
    );
}
export default Search_Results_List;