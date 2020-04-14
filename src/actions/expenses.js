import uuid from "uuid";
import database from '../firebase/firebase'
// ------- Action generators - Expenses -------

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState)=>{
        const uid = getState().auth.uid;
        const {  description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
        const expense = { description, note, amount, createdAt};

        // Push the data in firebase database.
        // Return a promise so we can chain it -----
        return database.ref(`users/${uid}/expenses`).push(expense)
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

    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const expenses = [];

        return database.ref(`users/${uid}/expenses`).once('value')
            .then ((snapshot) => {
            snapshot.forEach( (item) => {
                expenses.push({id:item.key , ...item.val()})});
            dispatch(setExpenses(expenses));
        });
    }
};

export const startRemoveExpense = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({id}));
        })
    }
};

export const startEditExpense = (id, update) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(update)
            .then( () =>{
                dispatch(editExpense(id,update));
            })
    }
};