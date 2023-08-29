import React, { useRef, useState } from 'react';
import Card from '../../UI/Card'
import classes from './MemberSignin.module.css'
import ForgotPassword from '../forgotPassword';
import axios from "axios";

const MemberSignIn = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const [forgotPass, setforgotPassword] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const message = 'member';
    const memberFormSignInHandler = async (event) => {
        event.preventDefault();
        const userDetail = ({
            userEmail: emailInputRef.current.value,
            userPassword: passwordInputRef.current.value,
        });

       


        const body = {
            emailid: userDetail.userEmail,
            password: userDetail.userPassword,
        };

        try {
            setIsLoading(true);
            const response = await axios.post(
                "http://localhost:4000/mentor/login",
                body, { timeout: 10000 });
            console.log(response);
            if (response.data.status === "success") {
                emailInputRef.current.value = ''
                passwordInputRef.current.value = ''
                const name = response.data.name;
                console.log(name);
                props.onLogin(name, userDetail.userEmail, userDetail.userPassword);
                props.memberSignInFormSubmit();
            }

        } catch(error) {
            console.log(error);
            if (error.code === "ERR_BAD_REQUEST")
                setErrormsg(error.response.data.message);
            else if (error.code === "ERR_BAD_RESPONSE")
                setErrormsg('Server Not Responding...')
            else
                setErrormsg("An error occurred. Please try again.");
        }
        setIsLoading(false);




        

    }

    const forgotPasswordHandler = () => {
        setforgotPassword(true);
        console.log(forgotPass)
    }

    return (
        <section className={classes.form}>
            <Card >
                {forgotPass && <ForgotPassword from={message} memsignUpHandler={props.signUpHandler} />}
                {!forgotPass &&
                    <div>
                        {!isLoading && <p className={classes.loading}> {errormsg}</p>}
                        {
                            isLoading && <section >
                                <p className={classes.loading}>Loading...</p>
                            </section>
                        }
                        <div className={classes['signin-form']}>
                            <h2>Sign In</h2>
                            <br></br>
                            <br></br>
                            <br></br>
                            <form onSubmit={memberFormSignInHandler}>
                                <input type="email" name="email" placeholder="Email" ref={emailInputRef} required></input>
                                <input type="password" name="password" placeholder="Enter-Password" ref={passwordInputRef} pattern=".{8,}"
                                    title="Password must be at least 8 characters long" required></input>
                                {/* <input type="password" name="code" placeholder="Authentic-Member-Code" ref={codeInputRef} required></input> */}
                                <button type="submit">Sign In</button>
                            </form>
                            <br />
                            <span className={classes.forgotPass} onClick={forgotPasswordHandler}>Forgot password</span>
                        </div>
                        <div className={classes.para}>
                            <p>Don't have an account? <button className={classes.buttonSubmit} type='button' onClick={props.signUpHandler}>Sign Up</button></p>
                        </div>
                    </div>}
            </Card>
        </section>
    );
};

export default MemberSignIn;