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
        // Return a promise so we can chain it in the test-----

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