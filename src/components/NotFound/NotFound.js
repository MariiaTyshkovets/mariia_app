import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css';

function NotFound() {

    return (
        <div className="not-found">
            <h3>This page was not found!</h3>
            <div className="info">
                <p>If you want to create your own burger then go to the <Link to='/mariia_app' className="nav-list__item">HOME</Link> page.</p>
            </div>
            <div className="info">
                <p>If you want to check history orders then go to the <Link to='/mariia_app/orders' className="nav-list__item">ORDERS</Link> page.</p>
            </div>
            <div>
                <p>If you have any question: <Link to='/mariia_app/contact' className="nav-list__item">LET US KNOW</Link>.</p>
            </div>
        </div>
    )
}

export default NotFound;