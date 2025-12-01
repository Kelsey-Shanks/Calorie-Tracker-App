// CHECKED AND LOOKS CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import '../App.css';
import History_Row_View from './Row_View.jsx';
import { MdOutlineEdit } from 'react-icons/md'; 

function History_Table ( {date_p, toEdit, entries} ) {

    return (    // caption = display date, edit button to right, maps meals or none if none conditional 
        <>
            <table id="table-list">
                <thead>
                    <tr id="table-title" >
                        <td colSpan="3">
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{date_p}</p>
                        </td>
                        <td>
                            <button id="editButton">
                                <MdOutlineEdit onClick={e => {          // set up edit button
                                    e.preventDefault();                     // prevent default
                                    toEdit();                               // use navigate function to edit page
                                }}/>
                            </button>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, i) => {
                        if ((entry.date).includes(date_p)) {
                            return (
                                <History_Row_View key={i} entry={entry} />
                            );
                        }
                    })}
                </tbody>
            </table>
        </>
    );
}

export default History_Table;

