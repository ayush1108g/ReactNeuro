import React, { useRef, useState } from 'react';
import Card from '../../UI/Card'
import classes from './StudentSignin.module.css'
import ForgotPassword from '../forgotPassword';


const StudentSignIn = (props) => {
    const [forgotPass, setforgotPassword] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const message = 'student';


    const studentFormSignInHandler = (event) => {
        event.preventDefault();
        const userDetail = ({
            userEmail: emailInputRef.current.value,
            userPassword: passwordInputRef.current.value,
        });

        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
        props.onLogin(userDetail.userEmail, userDetail.userPassword);

        // console.log(userDetail);
        //Authenticate and Then continue
        props.studentSignInFormSubmit();
    }
    const forgotPasswordHandler = () => {
        setforgotPassword(true);
        console.log(forgotPass)
    }


    return (
        <section className={classes.form}>
            <Card >
                {forgotPass && <ForgotPassword from={message} stusignUpHandler={props.signUpHandler} />}
                {!forgotPass &&
                    <div><div className={classes['signin-form']}>
                        <h2>Sign In</h2>
                        <br></br>
                        <br></br>
                        <br></br>
                        <form onSubmit={studentFormSignInHandler}>
                            <input type="email" name="email" placeholder="Email" ref={emailInputRef} required></input>
                            <input type="password" name="password" placeholder="Enter-Password" ref={passwordInputRef} pattern=".{8,}"
                                title="Password must be at least 8 characters long" required></input>
                            <button type="submit">Sign In</button>

                        </form>
                        <br />
                        <span onClick={forgotPasswordHandler}>Forgot password</span>


                    </div>
                        <div className={classes.para}>
                            <p >Don't have an account? <button className={classes.buttonSubmit} type='button' onClick={props.signUpHandler}>Sign Up</button></p>
                        </div>
                    </div>}
            </Card>
        </section>
    );
};

export default StudentSignIn;