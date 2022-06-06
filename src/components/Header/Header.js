import './Header.css';
import React from "react";
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <header className="header">
                <Link to='/mariia_app' className='nav-list__item'>
                    <div className='logo'>
                        <div className='logo__img'>
                            <img src={require('../../img/burger.png')} alt='logo burger'/>
                        </div>
                        <span>Pleasure</span>
                    </div>
                </Link>
                <nav>
                    <ul className='nav-list'>
                        <li>
                            <Link to='/mariia_app' className='nav-list__item'>Home</Link>|{" "}
                        </li>
                        <li>
                            <Link to='/mariia_app/orders' className='nav-list__item'>Orders</Link>|{" "}
                        </li>
                        <li>
                            <Link to='/mariia_app/contact' className='nav-list__item'>Contact</Link>|{" "}
                        </li>
                        <li>
                            <Link to='/mariia_app/FAQ' className='nav-list__item'>FAQ</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <hr/>
        </>
    )
}

export default Header;