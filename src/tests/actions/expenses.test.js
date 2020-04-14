import { startRemoveExpense, startEditExpense, setExpenses, startSetExpenses, startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import { expenses } from "../fixtures/expenses";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'fakeuid';
const defaultAuthState =  {auth: {uid}};

beforeEach( (done) => {
    const expensesData ={};
    expenses.forEach( ({id, description, note, amount, createdAt})=> {
    expensesData[id] = {id, description, note, amount, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then( () =>{
        done()});
});


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
    const store = createMockStore(defaultAuthState);
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
        database.ref(`expenses/${actions[0].expense.id}`)
            .once('value')
            .then((snapshot)=> expect(snapshot.val()).toEqual(expenseData));
        done();})
});





test('Should add expense with default to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
            .once('value')
            .then((snapshot)=> {expect(snapshot.val()).toEqual(expenseData)
                done()
            });
        });
});





test('Should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type:'SET_EXPENSES',
        expenses
    })
});

test('Should fetch the expenses from firebase',(done) =>{
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(()=> {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    })
});

// test('Should remove data from database', (done) => {
//     const store = createMockStore({});
//     const id = expenses[0].id;
//
//
//     store.dispatch(startRemoveExpense({id})).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({type: 'REMOVE_EXPENSE', id});
//
//         return database.ref(`users/${uid}/expenses/${id}`).once('value')
//             .then((snapshot) => {
//                 expect(snapshot.val()).toBeFalsy();
//                 done();
//             });
//         })
//     });

test('Should edit data in database', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const update = {
        description: 'Mouse',
        amount: 3000,
        note: 'This on is better',
        createdAt: 10
    };
    store.dispatch(startEditExpense(id, update)).then( () => {
        const actions = store.getActions();
        console.log(actions[0]);
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            update
        })
        return database.ref(`expenses/${id}`).once('value')
    }).then( (snapshot) => {
        expect(snapshot.val()).toEqual({...update, id});
        done();
    })
});