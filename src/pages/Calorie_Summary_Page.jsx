import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calorie_Daily_Summary from '../components/Calorie_Daily_Summary.jsx';;
import Entries_Table_View from '../components/Entries_Table_View.jsx';
import Entries_Table_Edit from '../components/Entries_Table_Edit.jsx';

function Calorie_Summary_Page() {

    const [calorie_sum, setCalTotal] = useState([]);                        // CALORIE TOTAL (int)
    const [unique_dates, setUniqueDates] = useState([]);                    // UNIQUE DATES (string arr)
    const [recent_date, setRecentDate] = useState([]);                      // RECENT DATE (string)
    const [entries, setEntries] = useState([]);                             // ENTRIES (objects arr)
    const [edit_status, setEditStatus] = useState(false);                   // EDIT ON OR OFF (bool)

    const navigate = useNavigate();

    const loadData = async () => {
        // FETCH TODAY DATA:
        const today_date = makeDateString((new Date()).toISOString());                 // WILL USE OFFICIALLY
        //const today_date = "2025-11-02"                                             // USED FOR TESTING
        const response1 = await fetch(`/calories?date=${today_date}`);              // get today's entries
        const today_entries = await response1.json();

        // FETCH TABLE DATA:
        const response2 = await fetch(`/calories?`);                                // get all entries
        const all_entries = await response2.json();
        let sorted_entries = all_entries.sort((a, b) => {                           // sort entries
            return new Date(b.date) - new Date(a.date);
        });
        setEntries(sorted_entries);

        // SET CALORIE MAIN NUM:
        if (today_entries === undefined || today_entries.length < 1) {              // ------------IF NONE TODAY----------------
            setRecentDate(makeDateString(sorted_entries[0].date));                          // save most recent date and set total = 0
            setCalTotal(0);                                  
        } else {                                                                    // ------------IF SOME TODAY----------------
            const today_sum = today_entries.reduce((sum, entry) => sum + entry.calories, 0);   // sum today and set
            setCalTotal(today_sum);
            setRecentDate(today_date);
        }

        // GET UNIQUE DATES:
        const dates_w_data = sorted_entries.map(entry => makeDateString(entry.date));        // get all dates YYYY-MM-DD
        const dates_arr = Array.from(new Set(dates_w_data));                                // get unique dates
        setUniqueDates(dates_arr);
    }

    // CONVERT DATE to YYYY-MM-DD format:
    const makeDateString = (date) => {         
        const stringDate = date.slice(0, 10);
        return stringDate;
    }

    useEffect(() => {                                                                       // load data
        loadData();                     
    }, []);

    const toEdit = () => {
        setEditStatus(true);
    }

    const toView = () => {
        setEditStatus(false);
    }

    const onDelete = async (id) => {
        const response = await fetch(
            `/calories/${id}`,
            {method: 'DELETE'}
        );
        if(response.status === 204){
            setEntries(entries.filter(e => e.id !== id));
        } else {
            alert(`Failed to delete calorie entry with id = ${id}, status code = ${response.status}`);
        }
        navigate('/');      // might make calorie-summary page?
    }

    if (edit_status === false) {    // load view table
        return (   
        <>
            <h2>Calorie Summary</h2>
            <Calorie_Daily_Summary calorie_sum={calorie_sum} />
            <div>
                {unique_dates.map((date_p, i) => (<Entries_Table_View key={i} date_p={date_p} entries={entries} toEdit={toEdit} />))}
            </div>   
        </>
        );
    } else if (edit_status === true) {  // load edit table
        return (
        <>
            <h2>Calorie Summary</h2>
            <Calorie_Daily_Summary calorie_sum={calorie_sum} />
            <div>
                {unique_dates.map((date_p, i) => (<Entries_Table_Edit key={i} date_p={date_p} entries={entries} toView={toView} onDelete={onDelete}/>))}
            </div>
        </>   
        );
    }
}

export default Calorie_Summary_Page;