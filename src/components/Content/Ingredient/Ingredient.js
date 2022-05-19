import './Ingredient.css';
import React from "react";

function Ingredient(props) {

    return (
        <>
            <div className='counter__ingredient'>
                <button onClick={() => props.add(props.nameOfIngredient, props.priceOfIngredient)} disabled={props.counter[props.nameOfIngredient] > 4 ? true : false}>&#43;</button>
                <button onClick={() => props.remove(props.nameOfIngredient, props.priceOfIngredient)} disabled={props.counter[props.nameOfIngredient] < 1 ? true : false}>&#8722;</button>
                <span> {props.counter[props.nameOfIngredient]} {props.nameOfIngredient} <small>({props.priceOfIngredient} USD)</small> </span>
            </div>
        </>
    )
}

export default Ingredient;