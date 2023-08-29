import React, { useRef, useState } from 'react';
import classes from './forgotPassword.module.css';
import axios from 'axios';

const ForgotPassword = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const password = useRef();
    const ConfirmPassword = useRef();
    const [code,setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const [submit, setSubmit] = useState(false);
    const [finalSubmitPassword, setFinalSubmitPassword] = useState(false);

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
            // if (EmailPass.response.status === '200') {
            setErrormsg(`Password reset email sent to ${emailentered}`);
            setSubmit(true);
            // }

        } catch (error) {
            console.log(error);
            setErrormsg('Something went wrong. Please try again');
        }
        setIsLoading(false);

    };


    const handleResetPassword = () => {
        const passwordentered = passwordRef.current.value;
        const body = {
            code: passwordentered,
        }
        setCode(passwordentered);
        // You can add your password reset logic here
        // For example, make an API call to send a reset email
        // and handle the response accordingly
        // Simulating a successful password reset message
        if (props.from === 'student') {
            try {
                const ResetPassword = axios.post("http://localhost:4000/student/verifycode", body, { timeout: 10000 });
                console.log(ResetPassword);
                setFinalSubmitPassword(true);
            } catch (error) {
                console.log(error);
                setErrormsg('Something went wrong. Please try again');
            }

        }
        if (props.from === 'member') {
            props.memsignUpHandler();
        }
    };

    const finalNewPassword = () => {
        const pass = password.current.value ;
        if( pass !== ConfirmPassword.current.value) {
            setErrormsg('Passwords do not match');
            return;
        }
        else{
            setErrormsg('');
            const body = {
                password:pass,
            }
            console.log(body);
            try {
                const ChangePassword = axios.patch(`http://localhost:4000/student/resetpassword/${code}` , body);
                console.log(ChangePassword);
            }catch(error){
                console.log(error);
            }


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
                <button className={classes.button} onClick={handleResetPassword}>Reset Password</button>
            </div>}
            {finalSubmitPassword && <div>
                <input type='name' placeholder='Enter Password' ref={password}></input>
                <input type='password' placeholder='Confirm Password' ref={ConfirmPassword}></input>
                <button className={classes.button} onClick={finalNewPassword}>Confirm Password</button></div>}
        </div>
    );
};

export default ForgotPassword;
