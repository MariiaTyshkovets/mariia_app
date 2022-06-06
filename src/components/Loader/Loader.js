import React from "react";
import './Loader.css';

function Loader() {
    return (
        <>
            <div className="loading">
                <div className="dot first"></div>
                <div className="dot second"></div>
                <div className="dot third"></div>
                <div className="dot fourth"></div>
                <div className="dot fifth"></div>
            </div>
        </>
    )
}

export default Loader;