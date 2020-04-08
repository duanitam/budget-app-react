import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'

export const ExpenseList = (props) => (
    <div>
        {props.expenses.length === 0 ?
            <p>No expenses</p> :
            props.expenses.map(item => <ExpenseListItem key={item.id} {...item}/>)}
    </div>
);


// Take the state and make it props. get passed to the component
// Things that we get from the store

const mapStateToProps =  (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)     // Orginizing the list according to the filters
    }
};


// Wrapper that connect the component to the store, passing props
export default connect(mapStateToProps)(ExpenseList);
