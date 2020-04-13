import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store/configureStore";
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux';
import { startSetExpenses } from "./actions/expenses";
import thunk from "redux-thunk";
import './styles/styles.scss';
import 'normalize.css/normalize.css';       // Normalizing the pages, so no difference between safari chrome ca.
import 'react-dates/lib/css/_datepicker.css'
import './firebase/firebase'

const store = configureStore();


const jsx = (
    <Provider store={store }>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app') );

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app') );
})
