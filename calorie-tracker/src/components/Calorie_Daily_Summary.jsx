import '../App.css';

function Calorie_Daily_Summary ( { calorie_sum } ) {       // summed calories provided

    return (
        <>
            <table id="summary_num">
                <thead> 
                    <tr>
                        <th>Today's Net Calories</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{calorie_sum} kcal</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Calorie_Daily_Summary;