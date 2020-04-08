import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from "../../actions/filters";


test('Should generate set start date action object', () => {
    const action = setStartDate({startDate:moment(0)});
    expect(action).toEqual({
        type:'SET_START_DATE',
        startDate: moment(0)
    })
});

test('Should generate set end date action object', () => {
    const action = setEndDate({endDate:moment(0)});
    expect(action).toEqual({
        type:'SET_END_DATE',
        endDate: moment(0)
    })
});

test('Should set text filter with default value', ()=>{
    const action = setTextFilter({});
    expect(action).toEqual({
        type:'SET_FILTER',
        text: undefined
    })
});

test('Should set text filter with value', ()=>{
    expect(setTextFilter({text: "FILTER"})).toEqual({
        type:'SET_FILTER',
        text:'FILTER'
    })
});

test('Sould set up the sort to sort by  amount', () => {
    expect(sortByAmount()).toEqual({
        type:'SORT_BY',
        sortBy: 'amount'
    })
});

test('Sould set up the sort to sort by date', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type:'SORT_BY',
        sortBy: 'date'
    })
});