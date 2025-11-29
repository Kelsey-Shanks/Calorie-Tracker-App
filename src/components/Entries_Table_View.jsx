// CHECKED AND LOOKS CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! [Today] IS PLACEHOLDER FOR [{entry_date}], SO NEED TO REMOVE
import '../App.css';
import Entry_Row_View from './Entry_Row_View.jsx';
import { useState, useEffect } from 'react';
import { MdOutlineEdit } from 'react-icons/md';

function Entries_Table_View ( { date_p, entries, toEdit } ) {

    return (
        <table id="table-list">
            <thead>
                <tr id="table-title" >
                    <td colSpan="3">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{date_p}</p>
                    </td>
                    <td>
                        <button id="editButton">
                            <MdOutlineEdit onClick={e => {              // set up edit button
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
                            <Entry_Row_View key={i} entry={entry} />
                        );
                    } 
                })}
            </tbody>
        </table>
    );
}

export default Entries_Table_View;




