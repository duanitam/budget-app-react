import React from "react";
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startRemoveExpense, editExpense } from "../actions/expenses";




export class EditExpensePage extends React.Component {

    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/')
    };

    onRemove = () => {
        this.props.removeExpense(this.props.expense.id);
        this.props.history.push('/')
    };

    render() {
        return (<div>
            <ExpenseForm
                expense = {this.props.expense}
                onSubmit={this.onSubmit}/>
            <br/>
            <button onClick={this.onRemove}>Remove</button><br/>
        </div>);
    }
}

const mapStateToProps = (state, props) =>
    ({ expense: state.expenses.find( expense => expense.id === props.match.params.id )});

const mapDispatchToProps = (dispatch, props) => ({
        removeExpense: (id) => dispatch(startRemoveExpense(id)),
        editExpense: (id, expense) => dispatch(editExpense(id,expense))
    });

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);