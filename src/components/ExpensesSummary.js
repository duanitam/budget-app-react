import { connect } from 'react-redux';
import numeral from 'numeral';
import {Link} from 'react-router-dom';
import selectExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';
import React from 'react';

export const ExpenseSummary = ( { count, total } ) => {
    return (
        <div className='page-header'>
            <div className="content-container">
                { count === 0 ?
                    <h1 className='page-header__title'> You have no expenses </h1> :
                    <h1 className='page-header__title'> You have <span>{count}</span> Expense{count === 1 ? true:'s'} in summary of <span>{numeral(total/100).format('$0,0.00')}</span> </h1>}
                    <div className="page-header__actions">
                        <Link className = 'button' to='/create'> Add Expense</Link>
                    </div>
            </div>
        </div>)
    }
;


const mapStateToProps = (state) => ({
    total: selectExpensesTotal(getVisibleExpenses(state.expenses, state.filters)),
    count: getVisibleExpenses(state.expenses, state.filters).length
});

export default connect(mapStateToProps)(ExpenseSummary);

