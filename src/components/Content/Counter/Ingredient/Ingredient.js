import './Ingredient.css';
import React from "react";

class Ingredient extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            ingredient: 0,
            disabledMinus: true,
            disabledPlus: false
        }
    }

    addOne () {
        this.setState((oldState) => {
            if (this.state.ingredient === 4) {
                return {
                    ...oldState,
                    ingredient: oldState.ingredient + 1,
                    disabledPlus: !oldState.disabledPlus
                }
            } else {
                return {
                    ...oldState,
                    ingredient: oldState.ingredient + 1,
                    disabledMinus: false
                }
            }            
        }) 
    }

    removeOne () {
        this.setState((oldState) => {
            if (this.state.ingredient === 5) {
                return {
                    ...oldState,
                    ingredient: oldState.ingredient - 1,
                    disabledPlus: !oldState.disabledPlus
                }
            } else if (this.state.ingredient === 1) {
                return {
                    ...oldState,
                    ingredient: oldState.ingredient - 1,
                    disabledMinus: !oldState.disabledMinus 
                }
            } else {
                return {
                    ...oldState,
                    ingredient: oldState.ingredient - 1 
                }
            }
         }) 
    }

    render() {
        return (
            <div className='counter__ingredient'>
                <button onClick={(sum) => {
                        this.addOne();
                        this.props.func(this.props.priceOfIngredient);
                    }} disabled={this.state.disabledPlus}>&#43;</button>
                <button onClick={(sum) => {
                        this.removeOne();
                        this.props.func(0 - this.props.priceOfIngredient);
                    }} disabled={this.state.disabledMinus}>&#8722;</button>
                <span> {this.props.nameOfIngredient} <small>({this.props.priceOfIngredient} USD)</small> </span>
            </div>
        )
    }
}

export default Ingredient;