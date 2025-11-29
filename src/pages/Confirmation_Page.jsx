import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdInfoOutline } from 'react-icons/md';
import { toast } from "react-toastify";

function Confirmation_Page ( { selected } ) {

    const navigate = useNavigate();

    const [calories, setCaloriesToSend] = useState(0);           // CALORIE ATTRIBUTE
    const [duration, setDuration] = useState(0);                // DURATION ATTRIBUTE
    const [name, setName] = useState('');                       // NAME ATTRIBUTE
    const [image, setImage] = useState('');                     // IMAGE ATTRIBUTE
    const [type, setType] = useState('');                       // TYPE ATTRIBUTE
    const [type_string, setTString] = useState('');

    useEffect(() => {    
            setCaloriesToSend(selected.calories);              // use passed down meal type to fill data
            setName(selected.name);
            setImage(selected.image);
            setType(selected.type);
        }, []);

    const nameInfo = () => {
        if (type === "meal") {
            toast.info("This is the name of the meal being added to your meal history.", {
                toastId: "name-info-meal",
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                theme: "light",
            });
        } else if (type === "exercise") {
            toast.info("This is the name of the activity being added to your activity history.", {
                toastId: "name-info-exercise",
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const caloriesInfo = () => {
        if (type === "meal") {
            toast.info("This is the calorie count from the meal.\nIf incorrect, please adjust by tapping number and typing a new number in.", {
                toastId: "calorie-info-meal",
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                theme: "light",
            });
        } else if (type === "exercise") {
            toast.info("This is the calorie count from the activity.\nIf incorrect, please adjust by tapping number and typing a new number in.", {
                toastId: "calorie-info-exercise",
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const durationInfo = () => {
        if (type === "meal") {
            toast.info("Please input the duration of time spent actively eating your meal.", {
                toastId: "duration-info-meal",
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                theme: "light",
            });
        } else if (type === "exercise") {
            toast.info("Please input the duration of the time spent doing this activity.", {
                toastId: "duration-info-exercise",
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const addEntry = async () => {                              // adds entry to database                        
        const date = (new Date()).toISOString();
        const newCalorieEntry = { date, duration, type, calories, name, image }
        const response = await fetch(
            '/calories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newCalorieEntry)
            }
        );
        if(response.status === 201) {
            alert('Successfully added the calorie entry!');
        } else {
            alert(`Failed to add calorie entry, status code = ${response.status}`);
        }
        navigate('/');                                                                      // navigate home
    }

    return ( // creates form for page as table w/info buttons, contains popup functions, autofils certain fields and allows input for calories and duration.
        <>
            <h2>Confirm {type_string} Input</h2>
            <form method="POST">
                <table id="confirmation">
                    <tbody>
                        <tr>
                            <td>
                                <p>Name of {type_string}:</p>
                            </td>
                            <td>
                                <button type="button"> 
                                    <MdInfoOutline onClick={e => {                  // display info prompt---------
                                    e.preventDefault();                             // prevent default behavior
                                    nameInfo();
                                    }}/>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <p>{name}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Calories:</p>
                            </td>
                            <td>
                                <button type="button"> 
                                    <MdInfoOutline onClick={e => {                  // display info prompt---------
                                    e.preventDefault();                             // prevent default behavior
                                    caloriesInfo();
                                    }}/>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    type="number"
                                    name="calories"
                                    placeholder={calories}
                                    value={calories}
                                    onChange={e => setCaloriesToSend(e.target.value)} />
                            </td>
                            <td>
                                <p>kcal</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Duration:</p>
                            </td>
                            <td>
                                <button type="button"> 
                                    <MdInfoOutline onClick={e => {      // info button next to duration-----------
                                        e.preventDefault();             // prevent default behavior
                                        durationInfo();
                                    }} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    type="number"
                                    name="duration"
                                    onChange={e => setDuration(e.target.valueAsNumber)} />
                            </td>
                            <td>
                                <p>minutes</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button type="submit" onClick={e => {                             // submit button-------------
                        e.preventDefault();                             // prevent default behavior
                        addEntry();                                  // POST entry
                        if (type === "meal"){
                            navigate('/meal-history');
                        } else if (type === "exercise") {
                            navigate("/activity-history");                      // auto-nav back to meal-history
                        }
                    }}>Add {type_string}</button>
                </div>
            </form>
        </>
    );
};

export default Confirmation_Page;