import React from "react";
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startRemoveExpense, startEditExpense } from "../actions/expenses";
import ExpenseModal from "./ExpenseModal";




export class EditExpensePage extends React.Component {

    state = {
        isOpen:false,
        expense: this.props.expense
    };

    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/')
    };

    onRemove = () => {
        this.props.removeExpense(this.props.expense.id);
        this.props.history.push('/')
    };

    handleOpenModal = () => { this.setState(()=>({ isOpen: true }))};

    handleCloseModal = () => { this.setState(()=>({ isOpen: false }))};


    render() {
        return (<div>
            <ExpenseModal onRemove = {this.onRemove} isOpen={this.state.isOpen} closeModal={this.handleCloseModal} />

            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">
                        Edit Expense
                    </h1>
                </div>
            </div>

            <div className="content-container">
                <ExpenseForm
                    expense = {this.props.expense}
                    onSubmit={this.onSubmit}/>
                <button className='button button--secondary' onClick={this.handleOpenModal}>Remove Expense</button><br/>
            </div>
        </div>);
    }
}

const mapStateToProps = (state, props) =>
    ({ expense: state.expenses.find( expense => expense.id === props.match.params.id )});

const mapDispatchToProps = (dispatch, props) => ({
        removeExpense: (id) => dispatch(startRemoveExpense(id)),
        editExpense: (id, expense) => dispatch(startEditExpense(id,expense))
    });

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);