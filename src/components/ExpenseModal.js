import Modal from 'react-modal';
import React from 'react';


const ExpenseModal = (props) =>
            <Modal
                className='modal'
                onRequestClose={props.closeModal}
                isOpen={props.isOpen}
                closeTimeoutMS={200}>

                    <div >
                        <h2 className='modal__title'>Remove Expense</h2>
                        <div className='modal__body'>Would you like to remove this expense?</div>
                    </div>

                    <div className="modal__buttons">
                        <button className='button' onClick={props.onRemove}> Yes</button>
                        <button className='button button--secondary' onClick={props.closeModal}> No</button>
                    </div>
            </Modal>;

export {ExpenseModal as default}