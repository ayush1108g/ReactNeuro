
import React, { useRef } from "react";
import classes from "./ContactUs.module.css";
import axios from "axios";

const ContactForm = (props) => {
    // const nameInputRef = useRef();
    // const emailInputRef = useRef();
    const phoneInputRef = useRef();
    const queryInputRef = useRef();

    const name = sessionStorage.getItem('name');
    const email = sessionStorage.getItem('email');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name: name,
            email: email,
            phoneno: phoneInputRef.current.value,
            massage: queryInputRef.current.value,
        }
        console.log(body);
        // if (body.name.trim().length > 0 && body.email.trim().length > 0 && body.phone.trim().length > 0 && body.query.trim().length > 0) {


        try {
            const response = await axios.post("http://localhost:4000/feedback", body);
            console.log(response);
            alert("Your message has been sent!");
            {
                // emailInputRef.current.value = '';
                phoneInputRef.current.value = '';
                queryInputRef.current.value = '';
            }
        }
        catch (err) {
            console.log(err);
            alert("Something went wrong!");
        }

    }

return (

    <React.Fragment>
        <div className={classes.btnbody}>
            <button className={classes['back-button']} onClick={props.backHandler} >Home</button>
        </div>
        <div className={classes.container}>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        // ref={nameInputRef}
                        value={name}
                        type="text"
                        id="name"
                        // required
                        disabled
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        // ref={emailInputRef}
                        value={email}
                        type="email"
                        id="email"
                        disabled
                    // required
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        ref={phoneInputRef}
                        type="tel"
                        id="phone"
                        required
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="query">Query</label>
                    <textarea
                        ref={queryInputRef}
                        id="query"
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </React.Fragment>

);
};

export default ContactForm;
