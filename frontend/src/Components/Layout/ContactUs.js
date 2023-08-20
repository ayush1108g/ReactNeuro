import React from "react";
import classes from './ContactUs.module.css'


const ContactUs = (props) => {


    return (
        <div className={classes.main}>
            <div className={classes.btnbody}>
                <button className={classes['back-button']} onClick={props.backHandler} >Home</button>
            </div>
            <iframe title="abc" src="https://docs.google.com/forms/d/e/1FAIpQLSfG4FV3G91oeqbh5U3ZkMwW1EGFZwnZG_3TlQJrBjUcTxhPBA/viewform?embedded=true" width="640" height="957" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>;
        </div>
    );
}

export default ContactUs;