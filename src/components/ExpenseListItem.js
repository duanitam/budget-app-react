import React from 'react';
import { Link } from 'react-router-dom'

const ExpenseListItem = (props) => {
    return(
        <div>
        <Link to={`/edit/${props.id}`}>
            <h3>Item Description: {props.description}</h3>
        </Link>
            <br/>
            Note: {props.note} <br/>
            Amount: {props.amount}
            <br/><br/>
        </div>
    );
};

export default ExpenseListItem;