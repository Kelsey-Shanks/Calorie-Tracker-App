import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Hamburger.css';
import { Link } from 'react-router-dom';

//***** Followed this tutorial to create the hamburger navigation menu:
// https://www.digitalocean.com/community/tutorials/react-react-burger-menu-sidebar 
// written by Bradley Kouchi on Octover 20, 2020.******/

export default props => {
    return (
        <Menu right >
          <Link to="/home">Home</Link>
          <Link to="/calorie-summary">Calorie Summary</Link>
          <Link to="/meal-history">Meal History</Link>
          <Link to="/find-a-meal">Search for a Meal</Link>
          <Link to="/settings">Settings</Link>
        </Menu>
    );

};