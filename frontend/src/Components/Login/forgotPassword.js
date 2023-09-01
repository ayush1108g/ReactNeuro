import React, { useRef, useState } from 'react';
import classes from './forgotPassword.module.css';
import axios from 'axios';
import { ToLink } from '../Contents/Main';

const ForgotPassword = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const password = useRef();
    const ConfirmPassword = useRef();
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const [submit, setSubmit] = useState(false);
    const [finalSubmitPassword, setFinalSubmitPassword] = useState(false);

    const proceedToResetPassword = async () => {
        const emailentered = emailRef.current.value.toLowerCase();
        const body = {
            emailid: emailentered,
        };
        try {
            setIsLoading(true);
            let EmailPass ='';
           // console.log(props.from);
            //console.log(body);
            if (props.from === 'member') {
                EmailPass = await axios.post(`${ToLink}/mentor/forgotpassword`, body, { timeout: 20000 });
            }
            if (props.from === 'student') {
                EmailPass = await axios.post(`${ToLink}/student/forgotpassword`, body, { timeout: 20000 });
            }
            
           // console.log(EmailPass);
            if (EmailPass.data.status === 'success') {
                setErrormsg(`Password reset email sent to ${emailentered}`);
                setSubmit(true);
            }

        } catch (error) {
            // console.log(error);
            if (error.code === "ERR_BAD_REQUEST") {
                setErrormsg('Email not found');
            }
            else {
                setErrormsg('Something went wrong. Please try again');
            }
        }
        setIsLoading(false);
    };


    const handleResetPassword = async () => {
        const passwordentered = passwordRef.current.value;
        const body = {
            code: passwordentered,
        }
        setCode(passwordentered);
        // You can add your password reset logic here
        // For example, make an API call to send a reset email
        // and handle the response accordingly
        // Simulating a successful password reset message
        try {
            setErrormsg('');
            setIsLoading(true);
            let ResetPassword = '';
            if (props.from === 'student') {
                ResetPassword = await axios.post(`${ToLink}/student/verifycode`, body, { timeout: 20000 });
            }
            else if (props.from === 'member') {
                ResetPassword = await axios.post(`${ToLink}/mentor/verifycode`, body, { timeout: 20000 });
            }
           // console.log(ResetPassword);
            if (ResetPassword.data.status === 'success') {
                setFinalSubmitPassword(true);
            }
        } catch (error) {
            // console.log(error);
            // setErrormsg('Something went wrong. Please try again');
            setErrormsg(error.response.data.message);
        }
        setIsLoading(false);

    };

    const finalNewPassword = async () => {
        const pass = password.current.value;
        const confirmpass = ConfirmPassword.current.value;
        if( pass.trim().length < 8 && confirmpass.trim().length <8 ) {
            setErrormsg("Password must be 8 character long");
            return;
        }

        if (pass !== ConfirmPassword.current.value) {
            setErrormsg('Passwords do not match');
            return;
        }
        else {
            setErrormsg('');
            const body = {
                password: pass,
            }
            //console.log(body);
            try {
                setIsLoading(true);
                let ChangePassword ='';
                if (props.from === 'student') {
                    ChangePassword = await axios.patch(`${ToLink}/student/resetpassword/${code}`, body);
                }
                else if (props.from === 'member') {
                    ChangePassword = await axios.patch(`${ToLink}/mentor/resetpassword/${code}`, body);
                }
                //console.log(ChangePassword);
                if (ChangePassword.data.status === 'success') {
                    alert("Password changed successfully");
                    props.onclc();
                    if (props.from === 'student') {
                        props.stuSignInHandler();
                    }
                    else if (props.from === 'member') {
                        props.memSignInHandler();
                    }
                }
            } catch (error) {
                // console.log(error);
                setErrormsg('Something went wrong. Please try again');
            }
            setIsLoading(false);


        }

        return;
    }


    return (
        <div className={classes.container}>
            <h2>Forgot Password</h2>
            {!finalSubmitPassword && !submit && <div>
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
            {!finalSubmitPassword && submit && <div>
                <input type='number' placeholder='Reset Code' ref={passwordRef}></input>
                <button className={classes.button} onClick={handleResetPassword} required>Reset Password</button>
            </div>}
            {finalSubmitPassword && <div>
                <input type='name' placeholder='Enter Password' pattern=".{8,}"
                    title="Password must be at least 8 characters long" ref={password} required></input>
                <input type='password' placeholder='Confirm Password' pattern=".{8,}"
                    title="Password must be at least 8 characters long" ref={ConfirmPassword} required></input>
                <button className={classes.button} onClick={finalNewPassword}>Confirm Password</button></div>}
        </div>
    );
};

export default ForgotPassword;
