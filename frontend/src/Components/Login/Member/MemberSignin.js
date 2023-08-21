import React, { useRef } from 'react';
import Card from '../../UI/Card'
import classes from './MemberSignin.module.css'

const MemberSignIn = (props) => {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const codeInputRef = useRef();

    const memberFormSignInHandler = (event) => {
        event.preventDefault();
        const userDetail = ({
            userEmail: emailInputRef.current.value,
            userPassword: passwordInputRef.current.value,
            authenticationCode: codeInputRef.current.value,
        });

        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
        codeInputRef.current.value = ''
        props.onLogin(userDetail.userEmail, userDetail.userPassword, userDetail.authenticationCode);
        // console.log(userDetail);
        //Authenticate and Then continue
        props.memberSignInFormSubmit();
    }

    return (
        <section className={classes.form}>
            <Card >
                <div className={classes['signin-form']}>
                    <h2>Sign In</h2>
                    <br></br>
                    <br></br>
                    <br></br>
                    <form onSubmit={memberFormSignInHandler}>
                        <input type="email" name="email" placeholder="Email" ref={emailInputRef} required></input>
                        <input type="password" name="password" placeholder="Enter-Password" ref={passwordInputRef} pattern=".{8,}"
                            title="Password must be at least 8 characters long" required></input>
                        <input type="password" name="code" placeholder="Authentic-Member-Code" ref={codeInputRef} required></input>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className={classes.para}>
                    <p>Don't have an account? <button className={classes.buttonSubmit} type='button' onClick={props.signUpHandler}>Sign Up</button></p>
                </div>
            </Card>
        </section>
    );
};

export default MemberSignIn;