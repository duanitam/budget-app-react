import  { ExpenseSummary }  from "../../components/ExpensesSummary";
import { shallow } from 'enzyme';
import React from 'react';
import { expenses } from '../fixtures/expenses';


beforeEach( ()=> {

});

test('Should render ExpenseSummary with one item', () => {
    const wrapper = shallow(<ExpenseSummary count={1} total={1241224} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseSummary with multiple items', () => {
    const wrapper = shallow(<ExpenseSummary count={4} total={2342342342}/>);
    expect(wrapper).toMatchSnapshot();

});