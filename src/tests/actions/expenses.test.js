import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test( 'Should set up remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id:'123abc'
    })
});
test( 'Should edit expense', () => {
    const action = editExpense('123abc', {description: 'This is new description', amount: 1234, note: 'This is new note'});
    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        update:{description: 'This is new description', amount: 1234, note: 'This is new note'},
        id: '123abc'
    })
});


test( 'Should add expense', () => {
    const action = addExpense({description: 'DESCRIPTION', note: 'NOTE', amount:123, createdAt:'CREATED AT'});
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
            description: 'DESCRIPTION', note: 'NOTE', amount:123, createdAt:'CREATED AT', id: expect.any(String)
        }
    })
});

test( 'Should add expense', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
            description: '', note: '', amount:0, createdAt:0, id: expect.any(String)
        }
    })
});