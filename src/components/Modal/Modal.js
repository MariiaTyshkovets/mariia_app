import React from "react";
import "./Modal.css"

function Modal(props) {

    return (
        <>
            <div className={props.isModalActive ? 'modal-checkout' : 'modal-checkout none'}>
                <h3>Your Bill</h3>
                <div className='bill-ingredients'>
                    <ul>
                        {props.addToBill()}
                    </ul>
                </div>
                <h3>Total: {props.total} USD</h3>
                <div>
                    <button className='btn-checkout' onClick={() => props.hideShowPurchase()}>Confirm</button>
                    <button className='btn-checkout' onClick={() => props.changeActiveModal()}>Canсel</button>
                </div>
            </div>
        </>
    )
}

export default Modal;