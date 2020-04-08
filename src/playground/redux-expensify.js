import {createStore, combineReducers} from "redux";
import uuid from 'uuid';

// ------- Action generators -------

// Expense Actions
const addExpense = ( { description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        createdAt,
        amount
    }
});
const removeExpense = ( { id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
const editExpense = (id, update) => ({
    type:'EDIT_EXPENSE',
    id,
    update
});

// Filter Actions
const setTextFilter = ({text = undefined}) => ({
    type: 'SET_FILTER',
    text
});
const sortByAmount = () => ({
    type:'SORT_BY',
    sortBy: 'amount'
});
const sortByDate = () => ({
    type:'SORT_BY',
    sortBy: 'date'
});
const setStartDate = ({startDate = ''} = {}) => ({
    type:'SET_START_DATE',
    startDate
});
const setEndDate = ({endDate = ''} = {}) => ({
    type:'SET_END_DATE',
    endDate
});

// -------- Reducers --------

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state=expensesReducerDefaultState, action) => {

    switch (action.type){
        case 'ADD_EXPENSE':
            return ([...state, action.expense]);

        case 'REMOVE_EXPENSE':
           return state.filter(item => item.id !== action.id);

        case 'EDIT_EXPENSE':
            return state.map(item => (item.id === action.id) ? ({...item,...action.update}): (item));
        default:
            return state
    }
};

// Filter Reducer
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filterReducer = (state =filterReducerDefaultState,action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return ({...state, text: action.text});
        case 'SORT_BY':
            return ({...state, sortBy: action.sortBy});
        case 'SET_START_DATE':
            return ({...state, startDate: action.startDate});
        case 'SET_END_DATE':
            return ({...state, endDate: action.endDate});
        default:
            return state
    }
};

// ----------- Store -----------
const store = createStore( combineReducers({
        expenses:expensesReducer,
        filters: filterReducer
    }) );


// Get visible expenses

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {

    return expenses.filter( item => {
        const startDateMatch = typeof startDate !== 'number' || item.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || item.createdAt <= endDate ;
        const textMatch = (typeof text !== "string") || item.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort( (a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt? 1 : -1;
        }

        if (sortBy === 'amount') {
            return a.amount < b.amount? 1 : -1;
        }
    } )
};

store.subscribe( () =>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
    }
);


// ---------- Calls to demonstrate -----------

const expenseOne = store.dispatch(addExpense({description:'Rent for Janurary', amount: 1000, createdAt: -4000}));
const expenseTwo = store.dispatch(addExpense({description:'Coffee', amount:300, createdAt: -5000} ));
store.dispatch(addExpense({description:'Coffee', amount:3000, createdAt: -5000} ));
store.dispatch(addExpense({description:'Coffee', amount:30, createdAt: -5000} ));
store.dispatch(addExpense({description:'Coffee', amount:400, createdAt: -5000} ));
store.dispatch(sortByAmount());


// store.dispatch(editExpense(expenseTwo.expense.id ,{ amount: 400 }));
// store.dispatch(removeExpense({id: expenseTwo.expense.id}));
//
// store.dispatch(setTextFilter({text:'e'}));
// store.dispatch(setTextFilter({}));
//
// store.dispatch(sortByDate());
//
// store.dispatch(setStartDate({startDate: 100}));
// store.dispatch(setStartDate({}));
// store.dispatch(setEndDate({endDate: 4000}));
// store.dispatch(setEndDate({}));

// const demoState = {
//     expenses: [{
//             id:1,
//             description: 'Janurary Rent',
//             note:'this is the final payment for that address',
//             amount: 54500,
//             createdAt: 0
//         }],
//     filters:{
//         text: 'rent',
//         sortBy: 'amount',       // Date or amount
//         startDate: undefined,
//         endDate: undefined
//     }
// };
