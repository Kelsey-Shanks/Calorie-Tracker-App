import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function P_Form ( {
    first_name, 
    last_name, 
    email, 
    phone, 
    pimage, 
    setFName, 
    setLName,
    setEmail,
    setPhone,
    setImage,
    setUser,
    user_id,
    reset} ) {

    // UseState for form views:
    const [edit_fname, setEditFName] = useState(false);
    const [edit_lname, setEditLName] = useState(false);
    const [edit_email, setEditEmail] = useState(false);
    const [edit_phone, setEditPhone] = useState(false);
    const [edit_pimage, setEditPImage] = useState(false);

    const navigate = useNavigate();

    // PUT function call:
    const updateUser = async(update, edit_type) => {
        let editedUserData;
        if (edit_type === "first_name") {
            editedUserData = { first_name: update };
        } else if (edit_type === "last_name") {
            editedUserData = { last_name: update };
        } else if (edit_type === "email") {
            editedUserData = { email: update };
        } else if (edit_type === "phone") {
            editedUserData = { phone: update };
        } else if (edit_type === "image") {
            editedUserData = { image: update };
        };
        
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
      
    if (!edit_fname && !edit_lname && !edit_email && !edit_phone && !edit_pimage) {   // Show List
        return(
            <>
                <table id="profile-settings-table">
                    <tbody>
                        <tr>
                            <td>
                                <p>First name:</p>
                            </td>
                            <td colSpan="2">
                                <p>{first_name}</p>
                            </td>
                            <td>
                                <button onClick={e => {
                                    e.preventDefault();
                                    setEditFName(true);
                                }}>Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Last name:</p>
                            </td>
                            <td colSpan="2">
                                <p>{last_name}</p>
                            </td>
                            <td>
                                <button onClick={e => {
                                    e.preventDefault();
                                    setEditLName(true);
                                }}>Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Email:</p>
                            </td>
                            <td colSpan="2">
                                <p>{email}</p>
                            </td>
                            <td>
                                <button onClick={e => {
                                    e.preventDefault();
                                    setEditEmail(true);
                                }}>Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Phone:</p>
                            </td>
                            <td colSpan="2">
                                <p>{phone}</p>
                            </td>
                            <td>
                                <button onClick={e => {
                                    e.preventDefault();
                                    setEditPhone(true);
                                }}>Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <p>Profile Image:</p>
                            </td>
                            <td>
                                <img src={pimage} width="100" height="100" />
                            </td>
                            <td>
                                <button onClick={e => {
                                    e.preventDefault();
                                    setEditPImage(true);
                                }}>Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
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
    } else if (edit_fname) {                                            // EDIT FIRST NAME
        return(
            <form method='PUT'>
                <label htmlFor="fname">First Name:</label>
                <input 
                        type="text" 
                        name="first_name"
                        value={first_name}
                        onChange={e => setFName(e.target.value)} />
                    <button type="submit" onClick={e => {                             // submit button-------------
                        e.preventDefault();                                         // prevent default behavior
                        updateUser(first_name, "first_name");                                       // PUT
                        setEditFName(false);
                    }}>Update</button>
            </form>  
        );
    } else if (edit_lname){                                             // EDIT LAST NAME
        return(
            <form method='PUT'>
                <label htmlFor="lname">Last Name:</label>
                <input 
                    type="text" 
                    name="last_name"
                    value={last_name}
                    onChange={e => setLName(e.target.value)} />
                        <button type="submit" onClick={e => {                       // submit button-------------
                            e.preventDefault();                                     // prevent default behavior
                            updateUser(last_name, "last_name");                                  // PUT
                            setEditLName(false);
                        }}>Update</button>
            </form>
        );
    } else if (edit_email) {                                            // EDIT EMAIL
        return(
            <form method='PUT'>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                    <button type="submit" onClick={e => {                             // submit button-------------
                        e.preventDefault();                                           // prevent default behavior
                        updateUser(email, "email");                                            // PUT
                        setEditEmail(false);
                    }}>Update</button>
            </form>
        );
    } else if (edit_phone) {                                            // EDIT PHONE NUMBER
        return(
            <form method='PUT'>
                <label htmlFor="phone">Phone Number:</label>
                <input 
                    type="text" 
                    name="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)} />
                    <button type="submit" onClick={e => {                             // submit button-------------
                        e.preventDefault();                                           // prevent default behavior
                        updateUser(phone, "phone");                                            // PUT
                        setEditPhone(false);
                    }}>Update</button>
            </form>
        );
    } else if (edit_pimage) {                                           // EDIT PROFILE IMAGE
        return(
            <form method='PUT'>
                <label htmlFor="pimage">User Profile Image:</label>
                <input 
                    type="text" 
                    name="pimage"
                    value={pimage}
                    onChange={e => setImage(e.target.value)} />
                    <button type="submit" onClick={e => {                               // submit button-------------
                        e.preventDefault();                                             // prevent default behavior
                        updateUser(pimage, "image");                                             // PUT
                        setEditPImage(false);
                    }}>Update</button>
            </form>
        );
    };
}

export default P_Form;