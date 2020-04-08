import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = (props) => {
    return(
        <div>
        <Link to={`/edit/${props.id}`}>
            <h3>Item Description: {props.description}</h3>
        </Link>
            <br/>
            Note: {props.note} <br/>
            Amount: {numeral((props.amount)/100).format('$0,0.00')}
            CreatedAt: {moment(props.createdAt).format('MMMM Do,YYYY')}
            <br/><br/>
        </div>
    );
};

export default ExpenseListItem;