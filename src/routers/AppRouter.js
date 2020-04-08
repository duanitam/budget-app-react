import {BrowserRouter, Link, NavLink, Route, Switch} from "react-router-dom";
import React from "react";
import Header from '../components/Header'
import ExpensePage from '../components/DashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import NotFound from '../components/NotFoundPage'


export default () => (
    <BrowserRouter >
        <div>
            <Header />
            <Switch>
                <Route path='/' component={ExpensePage} exact/>   {/* exact - so not all pages will render the / component as well*/}
                <Route path='/create' component={AddExpensePage}/>
                <Route path='/help' component={HelpPage}/>
                <Route path='/edit/:id' component={EditExpensePage}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
);