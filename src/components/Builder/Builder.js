import './Builder.css';
import React from "react";

function Builder(props) {
    
    return (
        <>
            <div className="burger-builder">
                <div className='top-bun'></div>
                {props.total <= 1 && (<div className='start'> Start by adding ingredients to your burger</div>)}
                {props.builder()}
                <div className='lower-bun'></div>
            </div>
        </>
    )
}

export default Builder;