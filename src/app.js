import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store/configureStore";
import AppRouter, {history} from './routers/AppRouter'
import { Provider } from 'react-redux';
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from './actions/auth'
import LoaginPage from './components/LoadingPage'
import './styles/styles.scss';
import 'normalize.css/normalize.css';       // Normalizing the pages, so no difference between safari chrome ca.
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'

const store = configureStore();

let hasRenderded= false;

const renderApp = () => {
  if(!hasRenderded){
      ReactDOM.render(jsx, document.getElementById('app') );
        hasRenderded = true;
  }
};


const jsx = (
    <Provider store={store }>
        <AppRouter />
    </Provider>
);



ReactDOM.render(<LoaginPage />, document.getElementById('app') );

// Run the callback when user toggling authentication
firebase.auth().onAuthStateChanged( (user) => {
    if(user){
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/'){
                history.push('/dashboard')
            }
        });
    }
    else{
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});