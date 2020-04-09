
const reducer = ( accumulator, element ) => {
    return accumulator + element;
};

export default ( expenses ) => ( expenses.length > 0 ) ? expenses.map( element => element.amount).reduce(reducer) : 0 ;