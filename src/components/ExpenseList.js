import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'

export const ExpenseList = (props) => (
    <div className='content-container'>
        <div className='list-header'>
            <div className='show-for-mobile'>Expenses</div>
            <div className='show-for-desktop'>Expense</div>
            <div className='show-for-desktop'>Amount</div>
        </div>
        <div className="list-body">
            {props.expenses.length === 0 ?
                <div className='list-item list-item__message'>
                    <span>No expenses</span>
                </div>
                :
                props.expenses.map(item => <ExpenseListItem key={item.id} {...item}/>)}
        </div>
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
