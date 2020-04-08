import {NavLink} from "react-router-dom";
import React from "react";

const Header = () => (
    <header>
        <h1>Budget App</h1>
        <NavLink to='/' activeClassName='is-active' exact>Dashboard</NavLink>
        <NavLink to='/create' activeClassName='is-active'>Create Expense</NavLink>
        <NavLink to='/help' activeClassName='is-active'>Get Help</NavLink>
    </header>
);

export default Header;