import '../App.css';

function Calorie_Count_Meal ( {meal_sum} ) {       // sum of today_calories are given to this component

    return (
        <>
            <table id="summary_num">
                <thead>
                    <tr>
                        <th>Today's Consumed Calories</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{meal_sum} kcal</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Calorie_Count_Meal;