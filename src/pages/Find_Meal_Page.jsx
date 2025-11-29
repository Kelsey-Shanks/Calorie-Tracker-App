import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import TextField from '@mui/material/TextField';
//import Search_Results_List from '../components/Search_Results_List.jsx';


function Find_Meal_Page ( {setMealToUse} ) {   

    const [confirmation_mess, setConfirmationMess] = useState('');      // CONFIRMATION MESSAGE
    const [matches, setMatches] = useState([]);                         // added with microservice
    const [all_meals, setAllMeals] = useState([]);                      // sets type for query
    const navigate = useNavigate();

    const name_info = () => {                                                           // prompt function
        const message1 = `Search for an existing meal by typing the name of the dish.\n`;
        const message2 = "The existing options will be displayed below the search bar.\n";
        const message3 = `You must create a new meal if the intended meal is not displayed.`
        const full_message = message1 + message2 + message3;
        alert(full_message);
    }

    const toConfirmation = () => {                                                      // navigation function to confirm entry
        navigate(`/confirm-entry/`);
    }

    const getMeals = async () => {
        const response = await fetch("/selections?type=meal");     // get all meal options
        const meals = await response.json();
        setAllMeals(meals);
    }

    useEffect(() => {                                                           // load data
        getMeals();
    }, []);

    let input_handler_2 = async (e) => {  // try the microservice
        let input_search = e.target.value.toLowerCase();
        const response = await fetch (
            `/search_service?type=meal&search=${input_search}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(all_meals),
            }
        )
        if (response.status === 400) {
            console.log(`Error with search service: Error code: ${response.status}`);
        } else {
            const matches_found = await response.json();
            setMatches(matches_found);
        }
    }

    return ( // info button displays prompt, input sets search_entry
        <>
            <h2>Find a Meal</h2>
            <table id="search-table">
                <thead>
                    <tr>
                        <td >
                            <TextField
                                id="outlined-basic"
                                onChange={input_handler_2}
                                variant="outlined"
                                fullWidth
                                label="search"
                            />
                        </td>
                        <td>
                            <button> 
                                <MdInfoOutline onClick={e => {                  // display info prompt---------
                                e.preventDefault();                             // prevent default behavior
                                name_info();                                    // function to display prompt
                                }}/>
                            </button>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="2">
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
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <p>{confirmation_mess}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button id="path-btn" onClick={e => {
                            e.preventDefault();                                                     // prevent default behavior
                            alert("Are you sure you want to proceed with this selection?\nThere is no way back past this point.");
                            toConfirmation();                                // navigates to confirmation page
                            }}>Next</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>    
    );
}

export default Find_Meal_Page;