// CHECKED AND LOOKS CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import '../App.css';

function History_Row_View ( {entry} ) {

    return ( // passed JSON object correcty, calls arrtibute correctly
        <>
            <tr id="table-entries">
                <td>
                    <img src={entry.image} width="50" height="50"/>
                </td>
                <td>{entry.name}</td>
                <td>{entry.calories}</td>
                <td>kcal</td>
            </tr>
        </>
    );
}

export default History_Row_View;