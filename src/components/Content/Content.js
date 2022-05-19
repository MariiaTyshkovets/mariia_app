import './Content.css';
import Ingredient from './Ingredient/Ingredient';
import Builder from './Builder/Builder';
import React from "react";

class Content extends React.Component{

    constructor (props) {
        super(props);

        this.state = {
            ingredients: this.toState(),
            total: "1.00",
            isModalActive: false
        }

        this.removeFromState = this.removeFromState.bind(this);
        this.addToState = this.addToState.bind(this);
    }

    toState () {
        let ingre = this.props.ingredients;
        let obj = {};
        for (const [index, element] of ingre.entries()) {
            let item = element.name;
            obj[item] = 0;
        }
        return obj;
    };

    addToState (name, price) {
        this.setState((oldState) => {
            return {
                ...oldState,
                total: (+oldState.total + +price).toFixed(2), 
                ingredients: {
                    ...oldState.ingredients,
                    [name]: +oldState.ingredients[name] + 1
                },   
            }
        })
    }

    removeFromState (name, price) {
        this.setState((oldState) => {
            return {
                ...oldState,
                total: (+oldState.total - +price).toFixed(2), 
                ingredients: {
                    ...oldState.ingredients,
                    [name]: +oldState.ingredients[name] - 1
                }
            }
        })
    }

    changeActiveModal() {
        this.setState((oldState) => {
            return {
                ...oldState,
                isModalActive: !oldState.isModalActive
            }
        });
    }

    bill () {
        let li = "";
        if (this.state.total > 0) {
            Object.entries(this.state.ingredients).forEach(([key, value]) => {
                if (value > 0) {
                    li = [li, (<li>{key}: {value} x {this.props.ingredients.filter((item) => item.name === key)[0].price.toFixed(2)} USD</li>)]
                }
            });
        }
        return li;
    }
    
    render() {
        return (
            <>
                <main className="main">
                    <hr/>
                    <Builder ingredients={this.state.ingredients}/>
                    <div className='container-counter'>
                        <div className='counter__total'>Total:<br/>{this.state.total} USD</div>
                        <div className='counter'>
                            {this.props.ingredients.map((item) => <Ingredient add={this.addToState} 
                            remove={this.removeFromState} nameOfIngredient={item.name} priceOfIngredient={item.price} 
                            key={item.name} counter={this.state.ingredients} />)}                   
                        </div>
                        <button className='btn-checkout' disabled={this.state.total > 1 ? false : true} onClick={() => this.changeActiveModal()}>Checkout</button>
                    </div>
                    <div className={this.state.isModalActive ? 'modal-checkout' : 'modal-checkout none'}>
                        <h3>Your Bill</h3>
                        <div className='bill-ingredients'>
                            <ul>
                                {this.bill()}
                            </ul>
                        </div>
                        <h3>Total: {this.state.total} USD</h3>
                        <div>
                            <button className='btn-checkout'>Confirm</button>
                            <button className='btn-checkout' onClick={() => this.changeActiveModal()}>Canсel</button>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}

export default Content;