import { connect } from 'react-redux';
import numeral from 'numeral';
import {Link} from 'react-router-dom';
import selectExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';
import React from 'react';

export const ExpenseSummary = ( { allExpenses, count, total } ) => {
    return (
        <div className='page-header'>
            <div className="content-container">
                { count === 0 ?
                    <h1 className='page-header__title'> You have no expenses </h1> :
                    <h1 className='page-header__title'> You have <span>{count}</span> Expense{count === 1 ? true:'s'} in summary of <span>{numeral(total).format('$0,0.00')}</span> </h1>}
                {(allExpenses > count) && <div>{allExpenses-count} Expense{allExpenses-count === 1 ? ' is' : 's are'} hidden because of the filters</div>}
                {console.log(typeof allExpenses, 'allexp')}
                {console.log(typeof count, 'count')}
                {console.log( allExpenses === count)}
                    <div className="page-header__actions">
                        <Link className = 'button' to='/create'> Add Expense</Link>
                    </div>
            </div>
        </div>)
    }
;


const mapStateToProps = (state) => ({
    total: selectExpensesTotal(getVisibleExpenses(state.expenses, state.filters)),
    count: getVisibleExpenses(state.expenses, state.filters).length,
    allExpenses: state.expenses.length
});

export default connect(mapStateToProps)(ExpenseSummary);

