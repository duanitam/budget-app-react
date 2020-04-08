import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setEndDate, setStartDate } from '../actions/filters'
import {DateRangePicker} from "react-dates";

export class ExpenseListFilters extends React.Component {
    state = {
        calenderFocused: null
    };

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calenderFocused) => {
        this.setState(() => ({calenderFocused}))
    };

    onTextChange = (e) => {
        this.props.setTextFilter({text:e.target.value})};

    onSortChange = (e)=>{
        e.target.value === 'date' ? this.props.sortByDate() : this.props.sortByAmount();
    };


    render() {
        return (
            <div>
                <input type="text" value ={this.props.filters.text} onChange={this.onTextChange}/>
                <select value={this.props.filters.sortBy} onChange={this.onSortChange}>
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>
                <DateRangePicker
                startDate={this.props.filters.startDate}
                endDate={this.props.filters.endDate}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.calenderFocused}
                onFocusChange={this.onFocusChange}
                showClearDates={true}
                numberOfMonths={1}
                isOutsideRange={()=> false}
                />
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => {
    return{
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        sortByAmount:() => dispatch(sortByAmount()),
        sortByDate: () => dispatch(sortByDate()),
        setEndDate: (endDate) =>dispatch(setEndDate(endDate)),
        setStartDate: (startDate) => dispatch(setStartDate(startDate))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);