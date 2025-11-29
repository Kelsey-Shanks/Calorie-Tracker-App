// CHECKED AND LOOKS CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import '../App.css';
import { MdOutlineRemoveCircleOutline } from 'react-icons/md';

function History_Row_Edit ( {entry, onDelete} ) {

    return ( // passed JSON object correcty, calls arrtibute correctly
        <>
            <tr id="table-entries">
                <td>
                    <button id="removeButton">
                        <MdOutlineRemoveCircleOutline onClick={e => {           // remove button         
                            e.preventDefault();                                 // prevent default button behavior
                            if (confirm("Are you sure you want to delete this meal?\nThis change will be permanent and cannot be undone.")) {
                                onDelete(entry._id);                            // deletes id of entry
                            }                          
                        }}/>
                    </button>
                </td>
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

export default History_Row_Edit;