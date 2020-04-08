import expensesReducer from "../../reducers/expenses";
import { expenses } from "../fixtures/expenses";

test('Should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual([]);
});

test('Should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expense if ID was not found ', () => {
    const action = {
        type:'REMOVE_EXPENSE',
        id: 100
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0],expenses[1],expenses[2]])
});

test('Should add an expense', () => {
    const expense = { description: 'NEW RENT',  note: 'note',  amount: 10000, createdAt: 0 };
    const action = { type: 'ADD_EXPENSE', expense };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses,expense]);
});

test('Should edit an expense', () => {
    const update = {description: 'New description', amount: 100000000000};
    const action = { type: 'EDIT_EXPENSE',id:expenses[0].id ,update};
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([
        { ...expenses[0],...update},
        expenses[1],
        expenses[2]
    ])
});

test('Should not edit expenses if expense was not found', () => {
    const update = {description: 'New description', amount: 100000000000};
    const action = { type: 'EDIT_EXPENSE',id:100 ,update};
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});