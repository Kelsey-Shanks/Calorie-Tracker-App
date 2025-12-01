import '../App.css';
import { useState, useEffect } from "react";

/*  I figured out the table display as a grid from this Stack Overflow discussion:
    https://stackoverflow.com/questions/72834421/how-to-convert-nested-array-to-table-javascript-react 
    I altered the idea a little bit to make it more the way I need it, but I learned how 
    to make this grid from this discussion.
*/

function Badges_Display () {       // sum of burned_calories are given to this component

    const [badges, setBadges] = useState([]);
    const [grouped_badges, setGroupedBadges] = useState([]);

    const getBadges = async () => {
        const response = await fetch('/badge_service_cal');     // get today's mealsBa
        const badges_found = await response.json();
        setBadges(badges_found);
        groupBadges(badges_found);
    };

    const groupBadges = (badges) => {
        let i_2 = 0;
        let small_arr = [];
        let big_arr = [];
        for (let i=0; i < badges.length; i++) {
            if (i_2 <= 2) {                                 // add to small array if within columns 1-3
                small_arr.push(badges[i]);
                i_2++;
            } else if (i_2 > 2) {                           // add small array to big once row is determined
                small_arr.push(badges[i]);
                big_arr.push(small_arr);
                small_arr = [];
                i_2 = 0;
            }
        };
        setGroupedBadges(big_arr);
    };

    useEffect(() => {
        getBadges();
    }, []);

    return (
        <>
            <table id="badges-table">
                <thead>
                    <tr>
                        <th colSpan="4">Total Badges:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        grouped_badges.map((row, row_i) => {
                            return (
                                <tr key={row_i}>
                                    {
                                        row.map((badge_cell, cell_i) => {
                                            return (
                                                <td key={cell_i} className={badge_cell.unlocked ? 'completed-badge' : ''}>
                                                    <p>{badge_cell.name}</p>
                                                    <img className={badge_cell.unlocked ? '' : 'locked-img'} src={badge_cell.image} width="100" height="100"/>
                                                </td>
                                            )})
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export default Badges_Display;