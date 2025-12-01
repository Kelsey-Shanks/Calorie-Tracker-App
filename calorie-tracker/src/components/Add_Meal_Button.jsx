import '../App.css';

function Add_Meal_Button( {toSearch} ) {        // will eventually include popup and optional routes

    return (
        <div >
            <button id="path-btn" onClick={e => {
                e.preventDefault();
                toSearch();
            }}>Add Meal</button>
        </div>
    );
};

export default Add_Meal_Button;
