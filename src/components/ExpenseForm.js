import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';


const now = moment().format('MMM Do YYYY');


class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense?props.expense.description: '',
            note: props.expense?props.expense.note: '',
            amount: props.expense?(props.expense.amount/100).toString():'',
            createdAt:props.expense? moment(props.expense.createdAt) : moment(),
            focused: false,
            error: ''
        };
    }


    onDesctiptionChange = (e) => {
    const description = e.target.value;
    this.setState(()=>({description}))
    };

    onTextChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}))
    };

    onAmountChang = (e) => {
      const amount = e.target.value;
      if(!amount || amount.match(/^\d+(\.\d{0,2})?$/)){
          this.setState(() => ({amount}))
      }
    };

    onDateChange = (createdAt) => {
        if (createdAt){
            this.setState(() => ({createdAt}));
        }
    };

    onFocusChange = ({focused}) => {
        this.setState(()=> ({focused}))
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount){
            (!this.state.description) ?
                this.setState(()=> ({error:'No description provided'})) :
                (this.setState(()=>({error:'No amount provided'})));
        }
        else {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                description:this.state.description,
                amount: parseFloat(this.state.amount),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }

    };

    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                           value={this.state.description}
                           onChange={this.onDesctiptionChange}
                           placeholder='Description'
                           autoFocus/>
                    <input type="text"
                           placeholder='Amount'
                           value={this.state.amount}
                           onChange={this.onAmountChang}/>

                     <SingleDatePicker
                           date={this.state.createdAt}
                           onDateChange={this.onDateChange}
                           focused={this.state.focused}
                           onFocusChange={this.onFocusChange}
                           numberOfMonths = {1}
                           isOutsideRange={() => false }
                           />

                           <textarea
                        vaule={this.state.note}
                        onChange={this.onTextChange}
                        placeholder='Add a note for your expense'>
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}


export default ExpenseForm;