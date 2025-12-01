import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Login_Page( {setUser} ) { // date created and sent

    // UseState for variable updates:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // POST function call (securely get user data using inputted password and email):
    const getUser = async() => {
        const userLogin = { email: email, password: password };
        const response = await fetch(
            '/user_profiles?app=calorie_tracker&type=pass_val', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(userLogin)
            }
        );
        if (response.status === 400 || response.status === 404){
            alert(`User login failed code:${response.status}.`);
            
        } else if(response.status === 201) {
            const user_data = await response.json();
            setUser(user_data);
            alert('User successfully logged in!');
            navigate('/home');
        }
    };
      
    return(                                                 // login form (guest email=None and password=None)
        <>
            <form method='POST'>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input  
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={e => {
                    e.preventDefault();
                    getUser();
                }}>Login</button>
            </form>
        </>
    );
}

export default Login_Page;