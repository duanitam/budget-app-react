import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store/configureStore";
import AppRouter from './routers/AppRouter'
import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import getVisibileExpenses from './selectors/expenses'
import { Provider } from 'react-redux';
import './styles/styles.scss';
import 'normalize.css/normalize.css';       // Normalizing the pages, so no difference between safari chrome ca.
import 'react-dates/lib/css/_datepicker.css'


const store = configureStore();

store.dispatch(addExpense({description:'Rent - April', note:'Nothing', amount:23600}));
store.dispatch(addExpense({description:'Phone bill - April', note:'Nothing', amount:300}));
store.dispatch(addExpense({description:'Water bill - April', note:'Nothing', amount:1300}));
store.dispatch(addExpense({description:'Gas bill - April', note:'Nothing', amount:3300}));

const visibleExpenses = getVisibileExpenses(store.getState().expenses, store.getState().filters);
const jsx = (
    <Provider store={store }>
        <AppRouter />
    </Provider>
)

console.log(visibleExpenses);
ReactDOM.render(jsx, document.getElementById('app') );