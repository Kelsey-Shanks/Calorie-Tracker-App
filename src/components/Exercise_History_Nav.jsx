import '../App.css';

// Creates the meal history navigation button on home page

function Exercise_History_Nav( {toExerciseHistory}) {   // navigation function sent here

    return (
        <>
            <button onClick={e => {
                e.preventDefault();             // prevent default functions
                toExerciseHistory();                // navigate function used
            }}
            >Activity History</button>
        </>
    );
}

export default Exercise_History_Nav;
