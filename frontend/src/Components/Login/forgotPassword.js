import React, { useRef, useState } from 'react';
import classes from './forgotPassword.module.css';

const ForgotPassword = (props) => {
    const emailRef = useRef();

    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    

    const proceedToResetPassword = () => {
        const emailentered = emailRef.current.value.toLowerCase();

        //Check if the email is registered or not Both Student and Member
        // if (props.from === 'student') Check in student database
        // if (props.from === 'member') Check in member database
        // if email is registered then 
        // Generate a code and Send to the email
        setMessage(`Password reset email sent to ${emailentered}`);

        setSubmit(true);
    };
    const handleResetPassword = () => {
        // You can add your password reset logic here
        // For example, make an API call to send a reset email
        // and handle the response accordingly
        // Simulating a successful password reset message
        if (props.from === 'student') {
            props.stusignUpHandler();
        }
        if (props.from === 'member') {
            props.memsignUpHandler();
        }
    };

    return (
        <div className={classes.container}>
            <h2>Forgot Password</h2>
            {!submit && <div>
                <p>Enter your email to reset your password.</p>
                <input type="email" placeholder="Enter your email" ref={emailRef} />
                <button className={classes.button} onClick={proceedToResetPassword}>Proceed</button>
            </div>}
            <p className={classes.message}>{message}</p>
            {submit && <div>
                <input type='number' placeholder='Reset Code' ></input>
                <button className={classes.button} onClick={handleResetPassword}>Reset Password</button>
            </div>}

        </div>
    );
};

export default ForgotPassword;
