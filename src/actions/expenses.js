import uuid from "uuid";
import database from '../firebase/firebase'
// ------- Action generators - Expenses -------

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {

    return (dispatch)=>{
        const {  description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
        const expense = { description, note, amount, createdAt};

        // Push the data in firebase database.
        // Return a promise so we can chain it -----
        return database.ref('expenses').push(expense)
            .then( (ref) => {
            dispatch(addExpense({
                id:ref.key, ...expense})) })
            .catch((e) => {console.log(e)})
    }
};

export const removeExpense = ( { id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const editExpense = (id, update) => ({
    type:'EDIT_EXPENSE',
    id,
    update
});

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});


export const startSetExpenses = () => {

    return (dispatch) => {
        const expenses = [];

        return database.ref('expenses').once('value').then ((snapshot) => {
            for (let [key, value] of Object.entries((snapshot.val()))) { expenses.push({id:key,...value}) }
            dispatch(setExpenses(expenses));
        });
    }
};

export const startRemoveExpense = (id) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({id}));
        })
    }
};

export const startEditExpense = (id, update) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update(update)
            .then( () =>{
                dispatch(editExpense(id,update));
            })
    }
};