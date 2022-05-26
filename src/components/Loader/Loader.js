import React from "react";
import './Loader.css';

function Loader() {
    return (
        <>
            <div class="loading">
                <div class="dot first"></div>
                <div class="dot second"></div>
                <div class="dot third"></div>
                <div class="dot fourth"></div>
                <div class="dot fifth"></div>
            </div>
        </>
    )
}

export default Loader;