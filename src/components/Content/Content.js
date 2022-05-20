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

        this.addIngredientBuilder.bind(this)
    }

    toState = () => {
        let obj = {};
        this.props.ingredients.forEach((item) => {
            obj[item.name] = 0;
        })
        return obj;
    };

    addToState = (name, price) => {
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

    removeFromState = (name, price) => {
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

    changeActiveModal = () => {
        this.setState((oldState) => {
            return {
                ...oldState,
                isModalActive: !oldState.isModalActive
            }
        });
    }

    addToBill = () => {
        let li = "";
        if (this.state.total > 0) {
            Object.entries(this.state.ingredients).forEach(([key, value]) => {
                let price = this.props.ingredients.filter((item) => item.name === key)[0].price.toFixed(2);
                if (value > 0) {
                    li = [li, (<li key={key}>{key}: {value} x {price} USD</li>)]
                }
            });
        }
        return li;
    }

    addIngredientBuilder = () => {
        let block = "";
        Object.entries(this.state.ingredients).forEach(([key, value]) => {
            if (value > 0) {
                let nameOfClass = key.toLowerCase();
                for (let index = 0; index < value; index++) {
                    block = [block, (<div className={nameOfClass + " ingredient"} key={nameOfClass + "_" + index}></div>)]
                }     
            }
        });
        return block;
    }
    
    render() {
        return (
            <>
                <main className="main">
                    <hr/>
                    <Builder total={this.state.total} builder={this.addIngredientBuilder}/>
                    <div className='container-counter'>
                        <div className='counter__total'>Total:<br/>{this.state.total} USD</div>
                        <div className='counter'>
                            {this.props.ingredients.map((item) => <Ingredient add={this.addToState} 
                            remove={this.removeFromState} nameOfIngredient={item.name} priceOfIngredient={item.price} 
                            key={item.name} counter={this.state.ingredients} />)}                   
                        </div>
                        <button className='btn-checkout' disabled={this.state.total <= 1} onClick={this.changeActiveModal}>Checkout</button>
                    </div>
                    <div className={this.state.isModalActive ? 'modal-checkout' : 'modal-checkout none'}>
                        <h3>Your Bill</h3>
                        <div className='bill-ingredients'>
                            <ul>
                                {this.addToBill()}
                            </ul>
                        </div>
                        <h3>Total: {this.state.total} USD</h3>
                        <div>
                            <button className='btn-checkout'>Confirm</button>
                            <button className='btn-checkout' onClick={this.changeActiveModal}>Canсel</button>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}

export default Content;