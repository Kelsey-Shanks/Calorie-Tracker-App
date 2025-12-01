import { useState, useEffect } from 'react';

function View_Feedback_Page () { 

    const [feedback, setFeedback] = useState([]);
    const [password, setPassword] = useState('');
    const [isVisible, setPasswordVisible] = useState(true);
    const [isVisible2, setFeedbackTableVis] = useState(false);

    const toggleVisibilityPass = () => {
        setPasswordVisible(!isVisible);
    };

    const toggleVisibilityTable = () => {
        setFeedbackTableVis(!isVisible2);
    }

    const CORRECT_PASSWORD = "1"; //set your password here

    function checkPassword() {
        if (password === CORRECT_PASSWORD) {
            toggleVisibilityPass();
            loadFeedback();
            toggleVisibilityTable();
        } else {
            alert("Incorrect password.");
        }
    }

    //fetch and display feedback data
    const loadFeedback = async () => {
        const response = await fetch("/feedback_service");
        const data = await response.json();
        setFeedback(data);
        console.log(`Feedback found: ${data}`);
        if (!Array.isArray(data)) {
            alert("Invalid response from server.");
            return;
        } else if (data.length === 0) {
            alert("No feedback found.");
            return;
        } else if (response.status !== 200) {
            alert(`Error loading feedback - status code: ${response.status}`);
        }
    };

    return (
        <>
            <h2>Feedback Viewer</h2>
            {
                isVisible &&
                <div id="password-section">
                    <form >
                        <h3>Enter Password</h3>
                        <p>This page is protected. Please enter the admin password.</p>
                        <input type="password" id="passwordInput" placeholder="Enter password" onChange={e => {setPassword(e.target.value)}}/>
                        <br/>
                        <button type="button" onClick={e => {
                            e.preventDefault();
                            checkPassword();
                        }}>Submit</button>
                        <p id="errorMessage" style={{ color: 'red', display: 'none'}}>Incorrect password. Try again.</p>
                    </form>
                </div>
            }

            {
                isVisible2 &&
                <div id="feedback-section" >
                    <h3>All Feedback Entries</h3>
                    <button onClick={loadFeedback}>Refresh</button>
                    <div id="feedback-table-container">
                        <table className='feedback-table'>
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col style={{ width: '500px' }}/>
                                <col />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Category</th>
                                    <th>Message</th>
                                    <th>Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    feedback.map((entry, row_i) => {
                                        return(
                                            <tr key={row_i}>
                                                {
                                                    Object.keys(entry).map((property, cell_i) => {
                                                        if (property !== "_id" && property !== "__v"){
                                                            if (property === "message"){
                                                                return(
                                                                <td key={cell_i}>
                                                                    {entry[property]}
                                                                </td>
                                                                )
                                                            } else if (property === "submittedAt") {
                                                                let date = ((new Date(entry[property]).toISOString()).slice(0,10));
                                                                return(
                                                                    <td key={cell_i}>
                                                                        {date}
                                                                    </td>
                                                                )
                                                            } else {
                                                                return(
                                                                <td key={cell_i}>
                                                                    {entry[property]}
                                                                </td>
                                                                )
                                                            }
                                                            
                                                        } 
                                                    })
                                                }
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    );
}

export default View_Feedback_Page;