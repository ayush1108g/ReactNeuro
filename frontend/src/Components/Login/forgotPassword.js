import React, { useRef, useState } from 'react';
import classes from './forgotPassword.module.css';
import axios from 'axios';

const ForgotPassword = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const [submit, setSubmit] = useState(false);

    

    const proceedToResetPassword = () => {
        const emailentered = emailRef.current.value.toLowerCase();
        const body = {
            emailid: emailentered,
        };
        try {
            setIsLoading(true);
            const EmailPass = axios.post("http://localhost:4000/student/forgotpassword", body, { timeout: 10000 })
            console.log(EmailPass);
            //Check if the email is registered or not Both Student and Member
            // if (props.from === 'student') Check in student database
            // if (props.from === 'member') Check in member database
            // if email is registered then 
            // Generate a code and Send to the email
            if (EmailPass.response.status === '200') {
                setErrormsg(`Password reset email sent to ${emailentered}`);
                setSubmit(true);
            }

        } catch (error) {
            console.log(error);
            setErrormsg('Something went wrong. Please try again');
        }
        setIsLoading(false);

    };


    const handleResetPassword = () => {
        const passwordentered = passwordRef.current.value;
        // You can add your password reset logic here
        // For example, make an API call to send a reset email
        // and handle the response accordingly
        // Simulating a successful password reset message
        if (props.from === 'student') {
            try {
                const ResetPassword = axios.patch(`http://localhost:4000/student/resetpassword/${passwordentered}`, { timeout: 10000 })
            } catch (error) {
                console.log(error);
                setErrormsg('Something went wrong. Please try again');
            }
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
            {!isLoading && <p className={classes.loading}> {errormsg}</p>}
                {
                    isLoading && <section >
                        <p className={classes.loading}>Loading...</p>
                    </section>
                }
            {submit && <div>
                <input type='number' placeholder='Reset Code' ref={passwordRef}></input>
                <button className={classes.button} onClick={handleResetPassword}>Reset Password</button>
            </div>}

        </div>
    );
};

export default ForgotPassword;
