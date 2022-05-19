import './Header.css';
import React from "react";

function Header() {
    return (
        <>
            <header className="header">
                <div className='logo'>
                    <div className='logo__img'>
                        <img src={require('../../img/burger.png')} alt='logo burger'/>
                    </div>
                    <span>Pleasure</span>
                </div>
                <nav>
                    <ul className='nav-list'>
                        <li className='nav-list__item'>First</li>
                        <li className='nav-list__item'>Second</li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;