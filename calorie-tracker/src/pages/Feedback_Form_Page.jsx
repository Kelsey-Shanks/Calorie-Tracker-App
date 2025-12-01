import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Feedback_Form_Page () { 

    const navigate = useNavigate();

    const [name, setFeedName] = useState('');
    const [email, setFeedEmail] = useState('');
    const [category, setFeedCategory] = useState('');
    const [message, setFeedMessage] = useState('');

    const addFeedback = async () => {                              // adds feedback to database                        
        const submittedAt = (new Date()).toISOString();
        const newFeedback = { name, email, category, message, submittedAt}
        const response = await fetch(
            '/feedback_service', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newFeedback)
            }
        );
        if (response.staus === 400) {
            alert(`Failed to send feedback, status code = ${response.status}`);
        } else {
            alert("Successfully sent feedback.");
            navigate("/home");
        }
    };

    return (
        <>
            <h2>Submit Feedback</h2>
            <form method="POST" id="feedback-form">
                <label htmlFor="name"><strong>Name:</strong></label>
                <br></br>
                <input type="text" id="name" name="name" onChange={e => setFeedName(e.target.value)} required/>
                <br></br>
                <label htmlFor="email"><strong>Email:</strong></label>
                <br></br>
                <input type="email" id="email" name="email" onChange={e => setFeedEmail(e.target.value)} required/>
                <br></br>
                <label htmlFor="category"><strong>Feedback Category:</strong></label>
                <br></br>
                <select id="category" name="category" onChange={e => setFeedCategory(e.target.value)} required>
                    <option value="">Select a category...</option>
                    <option value="bug report">Bug Report</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                </select>
                <br></br>
                <label htmlFor="message"><strong>Your Feedback:</strong></label>
                <br></br>
                <textarea id="message" name="message" rows="5" cols="40" onChange={e => setFeedMessage(e.target.value)} required></textarea>
                <br></br>
                <button type="submit" onClick={e =>{
                    e.preventDefault();
                    addFeedback();
                }}>Submit Feedback</button>
            </form>
        </>
    );
}

export default Feedback_Form_Page;