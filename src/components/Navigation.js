import React from 'react';
import { NavLink } from 'react-router-dom';
import "./navigation.scss"

const Navigation = ({ active }) => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active-nav-link" : "nav-link"}>Player</NavLink>
                </li>
                <li>
                    <NavLink to="/settings" className={({ isActive }) => isActive ? "active-nav-link" : "nav-link"} >Settings</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "active-nav-link" : "nav-link"} >About</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;