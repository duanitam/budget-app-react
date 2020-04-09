import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';
import React from 'react';

export const ExpenseSummary = ( { count, total} ) => {

    return (
        <div>
            { count === 0 ?
                <div> You have no expenses </div> :
                <div> You have {count === 1 ? '1 Expense' : count + ' Expenses' } in summary of {numeral(total/100).format('$0,0.00')} </div>}
        </div>)
    }
;


const mapStateToProps = (state) => ({
    expenses: selectExpensesTotal(getVisibleExpenses(state.expenses, state.filters)),
    count: getVisibleExpenses(state.expenses, state.filters).length
});

export default connect(mapStateToProps)(ExpenseSummary);

