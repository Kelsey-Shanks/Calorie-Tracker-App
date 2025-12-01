import '../App.css';

function Calorie_Count_Activity ( {exercise_sum} ) {       // sum of burned_calories are given to this component

    return (
        <>
            <table id="summary_num">
                <thead>
                    <tr>
                        <th>Today's Burned Calories</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{exercise_sum} kcal</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Calorie_Count_Activity;