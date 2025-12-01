import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Lang_Form ( {language, setLanguage, setUser, user_id, reset} ) {

    const navigate = useNavigate();

    // PUT function call:
    const updateUser = async() => {
        const editedUserData = { language: language }
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
        } else {
            alert(`Failed to update, status code = ${response.status}`);
        }
        navigate('/settings')
    };
      
    return(                                                 // change language with selection
        <>
            <form method='PUT'>
                <select
                    type="text"
                    name="language"
                    value={language}
                    onChange={e => {
                        setLanguage(e.target.value);
                        updateUser();
                        }}>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                </select>
                <button id="done-settings-btn" onClick={e => {
                    e.preventDefault();
                    reset();
                }}>Done</button>
            </form>
        </>
    );
}

export default Lang_Form;