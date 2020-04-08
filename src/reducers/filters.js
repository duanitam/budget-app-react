import moment from "moment";

// Filter Reducer
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),       // Limit the start and end dates for shown data
    endDate: moment().endOf('month')
};
const filterReducer = (state =filterReducerDefaultState,action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return ({...state, text: action.text});
        case 'SORT_BY':
            return ({...state, sortBy: action.sortBy});
        case 'SET_START_DATE':
            return ({...state, startDate: action.startDate});
        case 'SET_END_DATE':
            return ({...state, endDate: action.endDate});
        default:
            return state
    }
};

export default filterReducer;