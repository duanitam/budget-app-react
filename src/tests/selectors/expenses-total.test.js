import selectExpensesTotal from '../../selectors/expenses-total'
import { expenses } from "../fixtures/expenses";

test('Should add up multiple expenses', () => {
    expect(selectExpensesTotal(expenses)).toBe(24195);
});

test('Should add up single expense', () => {
    expect(selectExpensesTotal([expenses[0]])).toBe(expenses[0].amount);
});

test('Should return 0 for empty list', () => {
    expect(selectExpensesTotal([])).toBe(0);
})