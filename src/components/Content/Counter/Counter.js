import './Counter.css';
import React from "react";
import Ingredient from './Ingredient/Ingredient';


class Counter extends React.Component {

    constructor () {
        super();

        this.output = this.output.bind(this)
        this.state = {
           total: 1,
           disabled: true
        }
    }

    output(sum) {
        console.log("I'm counting");
        this.setState((oldState) => {

            if ((this.state.total + +sum) === 1) {
                return {
                    ...oldState,
                    total: (+oldState.total + +sum).toFixed(2),
                    disabled: true
                }
            } else {
                return {
                    ...oldState,
                    total: (+oldState.total + +sum).toFixed(2),
                    disabled: false
                }
            }
            
        });
    }
   
    render() {
        return (
            <div className='container-counter'>
                <div className='counter__total'>Total:<br/>{this.state.total} USD</div>
                <div className='counter'>
                    <Ingredient func={this.output} nameOfIngredient='Salad' priceOfIngredient='0.30'/>  
                    <Ingredient func={this.output} nameOfIngredient='Cheese' priceOfIngredient='0.50'/>
                    <Ingredient func={this.output} nameOfIngredient='Meat' priceOfIngredient='2.00'/>
                    <Ingredient func={this.output} nameOfIngredient='Bacon' priceOfIngredient='1.00'/>
                    <Ingredient func={this.output} nameOfIngredient='Tomato' priceOfIngredient='0.50'/>
                    <Ingredient func={this.output} nameOfIngredient='Onion' priceOfIngredient='0.30'/>                    
                </div>
                <button className='btn-checkout' disabled={this.state.disabled}>Checkout</button>
            </div>
        )
    }
}

export default Counter;