import '../App.css';

function Entry_Row_View ( {entry} ) {

    return (    // uses set state to show attribute
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

export default Entry_Row_View;