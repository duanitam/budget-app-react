import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = (props) => {
    return(
        <Link className='list-item' to={`/edit/${props.id}`}>

            <div>
                <h3 className='list-item__title'>{props.description}</h3>
                <span className='list-item__subtitle'>{moment(props.createdAt).format('MMMM Do,YYYY')}</span>
            </div>
            <div className='list-item__data'>
                {numeral((props.amount)).format('$0,0.00')}
            </div>
        </Link>
    );
};

export default ExpenseListItem;