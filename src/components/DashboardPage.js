import React from "react";
import ExpenseList from './ExpenseList'
import ExpenseListFilters from "./ExpenseListFilters";

const ExpensePage = () => (
    <div>
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);

export default ExpensePage;