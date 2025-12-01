import '../App.css';
import { MdOutlineRemoveCircleOutline } from 'react-icons/md';

function Entry_Row_Edit ( {entry, onDelete} ) {

    return (    // uses set state to show attribute
        <>
            <tr id="table-entries">
                <td>
                    <button id="removeButton">
                        <MdOutlineRemoveCircleOutline onClick={e => {           // remove button         
                            e.preventDefault();                                 // prevent default button behavior
                            if (confirm("Are you sure you want to delete this entry?\nThis change will be permanent and cannot be undone.")) {
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

export default Entry_Row_Edit;