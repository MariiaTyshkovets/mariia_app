import './Builder.css';
import React from "react";

function Builder(props) {

    function appendDiv(props){
        let block = (<div className='start'> Start by adding ingredients to your burger</div>)
        Object.entries(props.ingredients).forEach(([key, value]) => {
            if (value > 0) {
                block="";   
            }
        });
        Object.entries(props.ingredients).forEach(([key, value]) => {
            if (value > 0) {
                let nameOfClass = key.toLowerCase();
                for (let index = 0; index < value; index++) {
                    block = [block, (<div className={nameOfClass}></div>)]
                }     
            }
        });
        return block;
    }
    
    return (
        <>
            <div className="burger-builder">
                <div className='top-bun'></div>
                {appendDiv(props)}
                <div className='lower-bun'></div>
            </div>
        </>
    )
}

export default Builder;