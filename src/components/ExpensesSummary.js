import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';
import React from 'react';

export const ExpenseSummary = ( { count, total } ) => {
    return (
        <div>
            { count === 0 ?
                <h1> You have no expenses </h1> :
                <h1> You have {count === 1 ? '1 Expense' : count + ' Expenses' } in summary of {numeral(total/100).format('$0,0.00')} </h1>}
        </div>)
    }
;


const mapStateToProps = (state) => ({
    total: selectExpensesTotal(getVisibleExpenses(state.expenses, state.filters)),
    count: getVisibleExpenses(state.expenses, state.filters).length
});

export default connect(mapStateToProps)(ExpenseSummary);

