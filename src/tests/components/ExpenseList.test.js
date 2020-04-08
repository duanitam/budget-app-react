import {ExpenseList} from "../../components/ExpenseList";
import React from 'react';
import {shallow} from 'enzyme';
import {expenses} from '../fixtures/expenses';

test('SHould render expense list with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses ={expenses}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should render expense list with empty list', () => {
    const wrapper = shallow(<ExpenseList expenses = {[]}/>)
});