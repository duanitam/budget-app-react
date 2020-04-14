import { Router, Route, Switch} from "react-router-dom";
import React from "react";
import createHistory from "history/createBrowserHistory";
import ExpensePage from '../components/DashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import LoginPage from '../components/LoginPage'
import NotFound from '../components/NotFoundPage'
import PrivateRoute from './PrivateRoute';


export const history = createHistory();

export default () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path='/' component={LoginPage} exact/>   {/* exact - so not all pages will render the / component as well*/}
                <PrivateRoute path='/dashboard' component={ExpensePage} exact/>
                <PrivateRoute path='/create' component={AddExpensePage}/>
                <Route path='/help' component={HelpPage}/>
                <PrivateRoute path='/edit/:id' component={EditExpensePage}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);