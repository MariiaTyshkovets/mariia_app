import React from "react";
import axios from "axios";
import "./Purchase.css";
import FinishModal from "../../components/FinishModal/FinishModal";

class Purchase extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            address: '',
            promo: '',
            delivery: false,
            discount: '0.00',
            promoCodes: [
                {name: 'promo5spring', discount: 5}, 
                {name: 'promo10may', discount: 10}, 
                {name: 'promo15discount', discount: 15}
            ],
            validation: {
                name: false,
                phone: false,
                address: false,
            },
            errors: {
                name: '',
                phone: '',
                address: '',
            },
            isModalOpen: false
        }
    }

    inputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    validation = (event) => {

        const nameOfInput = event.target.name;
        const value = this.state[nameOfInput];

        switch (value.length) {
            case 0: 
                this.setStateError(nameOfInput, `The input cannot be empty!`);
                break;
            case 1:
            case 2:
                this.setStateError(nameOfInput, `Too short ${nameOfInput}!`);
                break;
            default: 
                this.checkInput(nameOfInput, value);
                break;
        } 
    }

    checkInput = (nameOfInput, value) => {
        const patternName = /[a-zA-Z]{3,15}/g;
        const patternPhone = /\(?\d{3}\)?([-])\(?\d{3}\)?([-])\d{4}/;
        const patternAddress = /[a-zA-Z\s]{3,15},\s[a-zA-Z\s]{3,15},\s\d{1,4}/g;

        switch (nameOfInput) {
            case 'name':
                if (patternName.test(value)) {
                    this.setStateValid(nameOfInput, true);
                    this.setStateError(nameOfInput, ''); 
                } else {
                    this.setStateValid(nameOfInput, false);
                    this.setStateError(nameOfInput, 'The name should be written only in Latin letters');
                }
                break;
            case 'phone':
                if (patternPhone.test(value)) {
                    this.setStateValid(nameOfInput, true); 
                    this.setStateError(nameOfInput, '');
                } else {
                    this.setStateValid(nameOfInput, false);
                    this.setStateError(nameOfInput, 'The phone should be only numbers: 012-345-6789');
                }
                break;
            default:
                if (patternAddress.test(value)) {
                    this.setStateValid(nameOfInput, true);
                    this.setStateError(nameOfInput, '');
                } else {
                    this.setStateValid(nameOfInput, false);
                    this.setStateError(nameOfInput, 'The adress should be written: City, Street, House (55)')
                }
        }
    }

    setStateError = (name, message) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                errors: {
                    ...prevState.errors,
                    [name]: message
                }  
            }
        })
    }

    setStateValid = (name, message) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                validation: {
                    ...prevState.validation,
                    [name]: message
                }  
            }
        })
    }

    isFormValid = () => {
        const valid = this.state.validation;
        if (valid.name) {
            if (valid.phone) {
                if (valid.address) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    checkPromo = () => {
        this.state.promoCodes.forEach((item) => {
            if (this.state.promo.toLowerCase() !== item.name) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        promo: ''
                    }
                })
                return true;
            } else {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        discount: (item.discount/100*this.props.total).toFixed(2),
                        promo: ''
                    }
                })
                return false;
            }
        })
    }

    sendOrder = (event) => {

        event.preventDefault();

        let products = {}

        Object.entries(this.props.ingredients).forEach((item) => {
            if (item[1] > 0) {
                products[item[0]] = item[1]
            } 
        });
        
        const data = {
            orderName: this.state.name,
            orderPhone: this.state.phone,
            orderAddress: this.state.address,
            orderFast: this.state.delivery,
            orderProducts: products,
            orderPrice: +(Number(this.props.total - this.state.discount).toFixed(2))
        }

        const config = {
            method: "post",
            url: "http://burger-app-back.herokuapp.com/orders",
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }

        axios(config).then(res => console.log(res))
        .catch(e => console.log(e));

        this.openModal();
        this.props.reload();
    }

    openModal = () => {
        this.setState({isModalOpen: true})
    }

    render() {
        return (
            <>
                <div className='purchase-counter'>
                    {!this.state.isModalOpen ?
                    <form onSubmit={this.sendOrder}>
                        <fieldset>
                            <h3>RECIPIENT DATA</h3>
                            <div className="data-item">
                                <div className="label">
                                    <label htmlFor="name">Name</label>
                                </div>
                                <input type='text' placeholder="Enter your name" name="name" onChange={this.inputChange} onBlur={this.validation} required/>
                                <span className="error">{this.state.errors.name}</span>
                            </div>
                            <div className="data-item">
                                <div className="label">
                                    <label htmlFor="phone">Phone</label>
                                </div>
                                <input type='tel' placeholder="Enter your phone" name="phone" onChange={this.inputChange} onBlur={this.validation} required/>
                                <span className="error">{this.state.errors.phone}</span>
                            </div>
                        </fieldset>
                        <hr/>
                        <fieldset>
                            <h3>DELIVERY</h3>
                            <div className="data-item">
                                <div className="label">
                                    <label htmlFor="address">Address</label>
                                </div>
                                <input type='text' placeholder="Enter delivery address" name="address" onChange={this.inputChange} onBlur={this.validation} required/>
                                <span  className="error">{this.state.errors.address}</span>
                            </div>
                            <div className="data-item checkbox">
                                <input type='checkbox' name="delivery" onClick={this.inputChange}/>
                                <label htmlFor="delivery" className="label">Quick delivery</label>
                            </div>
                        </fieldset>
                        <hr/>
                        <fieldset>
                            <h3>PROMO CODE</h3>
                            <div className="data-item">
                                <div className="label">
                                    <label htmlFor="promo">Promo code</label>
                                </div>
                                <input type='text' placeholder="Enter your promo code" name="promo" value={this.state.promo} onChange={this.inputChange}/>
                            </div>
                            <button type="button" disabled={this.state.promo.length < 1} onClick={this.checkPromo}>Apply promo</button>
                        </fieldset>
                        <hr/>
                        <fieldset>
                            <div className="order">
                                <div className="order-item">
                                    <p>Order price</p>
                                    <p>{this.props.total} USD</p>
                                </div>
                                <div className="order-item">
                                    <p>Discount</p>
                                    <p>{this.state.discount} USD</p>
                                </div>
                                <div className="order-item">
                                    <p>TOTAL</p>
                                    <p>{Number(this.props.total - this.state.discount).toFixed(2)} USD</p>
                                </div>
                            </div>
                            <div >
                                <button type="submit" disabled={!this.isFormValid()}>ORDER</button>
                                <button type="button" onClick={() => this.props.hideShowPurchase()}>Cancel</button>
                            </div>
                        </fieldset>
                    </form>
                    : <FinishModal />}
                </div>
            </>
        )
    }
}

export default Purchase;