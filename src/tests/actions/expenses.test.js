import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import { expenses } from "../fixtures/expenses";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);



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


test( 'Should add expense with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:expenses[2]
    })
});

test('Should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This on is better',
        createdAt: 10
    };
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`)
            .once('value')})
            .then(snapshot=> expect(snapshot.val()).toEqual(expenseData));
        done();
});

test('Should add expense with default to database and store', (done) => {

    const store = createMockStore({});
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }

    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`)
            .once('value')})
        .then(snapshot=> expect(snapshot.val()).toEqual(expenseData));
    done();
});

// test( 'Should add expense with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense:{
//             description: '', note: '', amount:0, createdAt:0, id: expect.any(String)
//         }
//     })
// });