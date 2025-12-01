// CHECKED AND LOOKS CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! [CHECK MENU COMPONENT FORMAT?]
import {Link} from 'react-router-dom'
import '../App.css';
import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { MdHome } from 'react-icons/md';

import Hamburger from './Hamburger.jsx';


function Navigation() {

    return ( // sets back button, home button, and hamburger menu button for page nav bar
        <div id="top-nav-bar">
            <h1 id="app-name-bar">Calorie Tracker</h1>
            <button id="home-button">
                <Link to="/home"><MdHome /></Link>
            </button>
            <div className="Nav-Menu" id="outer-container">
                <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            </div>  
        </div>
    );
};

export default Navigation;
