import React from "react";
import { Link } from "react-router-dom";
import './FAQ.css';

function FAQ() {

    return (
        <article className="faq">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-question">
                <h4>Should I give money "for tea"?</h4>
                <p>As you wish! If, in your opinion, the courier earned money "for tea", then why not? We allow couriers to receive (but forbid to ask for) money "for tea".</p>
            </div>
            <hr/>
            <div className="faq-question">
                <h4>How to use a promo code?</h4>
                <p>Enter the code on our website when placing an order, activate it and get a discount.</p>
            </div>
            <hr/>
            <div className="faq-question">
                <h4>How to use a promo code?</h4>
                <p>Enter the code on our website when placing an order, activate it and get a discount.</p>
            </div>
            <div className="faq-question">
                <h4>If you have any question: <Link to='/mariia_app/contact' className="nav-list__item">LET US KNOW</Link>.</h4>
            </div>
        </article>
    )
}

export default FAQ;