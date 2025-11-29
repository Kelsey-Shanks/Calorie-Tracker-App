// CHECKED AND LOOKS CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! [Today] IS PLACEHOLDER FOR [{entry_date}], SO NEED TO REMOVE
import '../App.css';
import Entry_Row_Edit from './Entry_Row_Edit.jsx';
import { useState, useEffect } from 'react';
import { MdCheckCircleOutline } from 'react-icons/md';

function Entries_Table_Edit( { date_p, entries, toView, onDelete } ) {

    return (
        <table id="table-list">
            <thead>
                <tr id="table-title">
                    <td colSpan="4"> 
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{date_p}</p>
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
                            <Entry_Row_Edit key={i} entry={entry} onDelete={onDelete}/>
                        );
                    } 
                })}
            </tbody>
        </table>
    );
}

export default Entries_Table_Edit;




