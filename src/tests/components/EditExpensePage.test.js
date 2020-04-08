import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from "../../components/EditExpensePage";
import { expenses } from '../fixtures/expenses'

let wrapper, removeExpense, editExpense, history;

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow( <EditExpensePage history={history}
                                        editExpense={editExpense}
                                        removeExpense={removeExpense}
                                        expense ={expenses[2]}/>);
    });

test('Should render EditExpensePage', () => { expect(wrapper).toMatchSnapshot(); });

test('Should handle editExpense', ()=> {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('Should handle removeExpense', ()=>{
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith( expenses[2].id );
});


