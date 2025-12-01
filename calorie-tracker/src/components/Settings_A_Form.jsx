import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

function A_Form ( {appearance, setAppearance, setUser, user_id, reset} ) {

    const navigate = useNavigate();

    // PUT function call:
    const updateUser = async() => {
        const editedUserData = { appearance: appearance }
        const response = await fetch(
            `/user_profiles/${user_id}?app=calorie_tracker`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(editedUserData)
            }
        );
        if(response.status === 200) {
            alert('Successfully updated user profile!');
            const user = await response.json();
            setUser(user);
            setIsDarkGrey(true);
        } else {
            alert(`Failed to update, status code = ${response.status}`);
        }
        navigate('/settings');
    };

    /*
    // Toggles appearance preference:
    const systemPrefersDarkGrey = useMediaQuery({ query: "(prefers-color-scheme: dark-grey)" });
    const [isDarkGrey, setIsDarkGrey] = useState(systemPrefersDarkGrey);

    useEffect(() => {
        setIsDarkGrey(systemPrefersDarkGrey);
    }, [systemPrefersDarkGrey]);

    useEffect(() => {
        document.html.setAttribute('data-theme', isDarkGrey ? 'dark-grey' : 'original-dark');
    }, [isDarkGrey]);

    const toggleTheme = (value) => {
        if (user.appearance === "dark-grey" || value == "dark-grey"){
            setIsDarkGrey(isDarkGrey);
        } else if (user.appearance === "original" || value == "original"){
            setIsDarkGrey(!isDarkGrey);
        }
    };
    */

    return(                                                 // change appearance with selection
        <>
            <form method='PUT'>
                <select
                    type="text"
                    name="appearance_mode"
                    value={appearance}
                    onChange={e => {
                        setAppearance(e.target.value);
                        updateUser();
                        }}>
                    <option value="original">Original Light Mode</option>
                    <option value="dark-grey">Greyscale Dark Mode</option>
                </select>
                <button id="done-settings-btn" onClick={e => {
                    e.preventDefault();
                    reset();
                }}>Done</button>
            </form>
        </>
    );
}

export default A_Form;