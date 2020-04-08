import ExpenseListItem from "../../components/ExpenseListItem";
import {expenses} from "../fixtures/expenses";
import React from 'react';
import {shallow} from 'enzyme';

test('Should render expense item list', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});