
// ------- Action generators - Filters -------

// Filter Actions
export const setTextFilter = ({text = undefined}) => ({
    type: 'SET_FILTER',
    text
});
export const sortByAmount = () => ({
    type:'SORT_BY',
    sortBy: 'amount'
});
export const sortByDate = () => ({
    type:'SORT_BY',
    sortBy: 'date'
});
export const setStartDate = ({startDate = ''} = {}) => ({
    type:'SET_START_DATE',
    startDate
});
export const setEndDate = ({endDate = ''} = {}) => ({
    type:'SET_END_DATE',
    endDate
});
