import '../App.css';
import { useState } from 'react';

function Search_Bar ( {toSearch} ) {

    const [search_input, setSearchInput] = useState('');

    return ( // info button displays prompt, input sets search_entry
            <input
                type="text"
                value={search_input}
                onChange={e  => {
                    setSearchInput(e.target.value); // save term
                    toSearch(e.target.value);       // pass up matches
                }}
            />
    );
}

export default Search_Bar;