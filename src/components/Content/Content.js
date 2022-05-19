import './Content.css';
import Counter from './Counter/Counter';
import React from "react";

function Content() {
    
    return (
        <>
            <main className="main">
                <hr/>
                <div className='burger-bilder'></div>
                <Counter />
            </main>
        </>
    )
}

export default Content;