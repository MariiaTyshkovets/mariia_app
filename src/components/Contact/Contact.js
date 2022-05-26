import React from "react";
import './Contact.css';

function Contact() {

    return (
        <>
            <div className="contact">
                <h3>Contact us</h3>
                <form>
                    <div className="data-item">
                        <div className="label">
                            <label htmlFor="name">Name</label>
                        </div>
                            <input type='text' placeholder="Enter your name" name="name" required/>
                        </div>
                        <div className="data-item">
                            <div className="label">
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <input type='tel' placeholder="Enter your phone" name="phone" required/>         
                        </div>
                        <div className="data-item-message">
                            <div className="label">
                                <label htmlFor="message">Message</label>
                            </div>
                            <textarea placeholder="Enter your message" name="message" rows={7} required></textarea>        
                        </div>
                        <button type='submit'>Send message</button>
                </form>
            </div>
        </>
    )
}

export default Contact;