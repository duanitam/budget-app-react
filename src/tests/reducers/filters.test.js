import moment from 'moment'
import filterReducer from "../../reducers/filters";

test('Should set up default filter values', ()=>{
    const state = filterReducer(undefined,{type: '@@INIT'});
    expect(state).toEqual({
        text:'',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('Should set sort by to amount ', ()=>{
    const state = filterReducer(undefined, {type: 'SORT_BY', sortBy: 'amount' });
    expect(state.sortBy).toBe('amount');
});

test('Should set sort by to date ', ()=>{
    const currentState = {
        text:'',
        startDate: undefined,
        endDate: undefined,
        sortBy:'amount'
    };
    const action = {type: 'SORT_BY', sortBy: 'date' };      // Because the default state is date. first changing the filter to anount
    const state = filterReducer(currentState,action );
    expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
    const state = filterReducer(undefined,{type: 'SET_FILTER', text:'text for test'});
    expect(state.text).toBe('text for test');
});

test('Should set start date', () => {
    const state = filterReducer(undefined, {type: 'SET_START_DATE', startDate: moment(0)});
    expect(state.startDate).toEqual(moment(0));
});

test('Should set start date', () => {
    const state = filterReducer(undefined, {type: 'SET_END_DATE', endDate: moment(0)});
    expect(state.endDate).toEqual(moment(0));
});