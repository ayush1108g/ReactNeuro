import React,{useRef} from 'react';
import Card from '../../UI/Card'
import classes from './StudentSignin.module.css'

const StudentSignIn = (props) => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const studentFormSignInHandler = (event) => {
        event.preventDefault();
        const userDetail = ({
            userEmail: emailInputRef.current.value,
            userPassword: passwordInputRef.current.value,
        });

        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
        props.onLogin(userDetail.userEmail,userDetail.userPassword);
        
        // console.log(userDetail);
        //Authenticate and Then continue
        props.studentSignInFormSubmit();
    }


    return (
        <section className={classes.form}>
            <Card >
                <div className={classes['signin-form']}>
                    <h2>Sign In</h2>
                    <br></br>
                    <br></br>
                    <br></br>
                    <form onSubmit={studentFormSignInHandler}>
                        <input type="email" name="email" placeholder="Email" ref={emailInputRef} required></input>
                        <input type="password" name="password" placeholder="Enter-Password" ref={passwordInputRef} required></input>
                        <button type="submit">Sign In</button>
                        <br></br>
                    </form>

                </div>
                <div className={classes.para}>
                    <p >Don't have an account? <button className={classes.buttonSubmit} type='button' onClick={props.signUpHandler}>Sign Up</button></p>
                </div>
            </Card>
        </section>
    );
};

export default StudentSignIn;