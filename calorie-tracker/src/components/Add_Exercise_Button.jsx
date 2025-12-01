import '../App.css';

function Add_Exercise_Button( {toSearch} ) {        // will eventually include popup and optional routes

    return (
        <div >
            <button id="path-btn" onClick={e => {
                e.preventDefault();
                toSearch();
            }}>Add Activity</button>
        </div>
    );
};

export default Add_Exercise_Button;
