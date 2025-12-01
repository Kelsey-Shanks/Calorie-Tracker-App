import '../App.css';
import History_Row_Edit from './Row_Edit.jsx';
import { MdAddCircleOutline } from 'react-icons/md';
import { MdCheckCircleOutline } from 'react-icons/md';

function Table_Edit ( {date_p, toSearch, toView, entries, onDelete} ) {

    return (    // creates caption with + button, title, and check button, creates rows same as view
        <>
            <table id="table-list">
                <thead>
                    <tr id="table-title">
                        <td>
                            <button id="addButton">
                                <MdAddCircleOutline onClick={e => {             // deliver prompt upon click (+ button)
                                    e.preventDefault();                         // prevent default button behavior
                                    toSearch();                                 // add popup when implement CREATE, but straight to search now
                                }}/>
                            </button>
                        </td>
                        <td colSpan="3">
                            <p>{date_p} </p>
                        </td>
                        <td>
                            <button id="doneButton">
                                <MdCheckCircleOutline onClick={e => {           // checkmark button         
                                    e.preventDefault();                         // prevent default button behavior
                                    toView();                                   // navigate to meal history page used
                                }}/>
                            </button>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, i) => {
                        if ((entry.date).includes(date_p)) {
                            return (
                                <History_Row_Edit key={i} entry={entry} onDelete={onDelete}/>
                            );
                        }
                    })}
                </tbody>
            </table>
        </>
    );
}

export default Table_Edit;