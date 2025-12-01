import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Priv_Form ( {password, setPassword, setUser, user_id, reset}) {

    // UseState for form views:
    const [edit_password, setEditPage] = useState(false);

    const navigate = useNavigate();

    // PUT function call:
    const updateUser = async(update) => {
        const editedUserData = { password: update }
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
      
    if (!edit_password) {   // Show List
        return(
            <>
                <table id="profile-settings-table">
                    <tbody>
                        <tr>
                            <td>
                                <p>Password:</p>
                            </td>
                            <td>
                                <p>{password}</p>
                            </td>
                            <td>
                                <button onClick={e => {
                                    e.preventDefault();
                                    setEditPage(true);
                                }}>Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <button id="done-settings-btn" onClick={e => {
                                    e.preventDefault();
                                    reset();
                                }}>Done</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    } else if (edit_password) {                                            // EDIT FIRST NAME
        return(
            <form method='PUT'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="password">Password:</label>
                            </td>
                            <td>
                                <input 
                                    type="text" 
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </td>
                            <td>
                                <button type="submit" onClick={e => {                             // submit button-------------
                                    e.preventDefault();                                           // prevent default behavior
                                    updateUser(password);                                         // PUT
                                    reset();
                                }}>Update</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <button id="done-settings-btn" type="button" onClick={e => {                             // submit button-------------
                                    e.preventDefault();                                           // prevent default behavior
                                    reset();
                                }}>Done</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>  
        );
    };
}

export default Priv_Form;