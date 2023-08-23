import React, { useRef } from 'react';
import Card from '../../UI/Card';
import classes from './MemberSignup.module.css'
import axios from 'axios';


const MemberSignUp = (props) => {

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    // const numberInputRef = useRef();
    const codeInputRef = useRef();

    const memberFormSignUpHandler = async (event) => {
        event.preventDefault();
        const userDetail = ({
            userName: nameInputRef.current.value,
            userEmail: emailInputRef.current.value,
            userPassword: passwordInputRef.current.value,
            // userNumber: numberInputRef.current.value,
            authenticationCode: codeInputRef.current.value,
        });
        nameInputRef.current.value = '';
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        // numberInputRef.current.value = '';
        codeInputRef.current.value = '';

        console.log(userDetail);

        const options = {
            headers: {
                "mentor-signup": "application/json",
            },
        };
        const body = {
            name: userDetail.userName,
            emailid: userDetail.userEmail,
            // phoneno: userDetail.userNumber,
            password: userDetail.userPassword,
            code: userDetail.authenticationCode,
        };
        const resp = await axios.post("http://localhost:4000/mentor/signup", body, options);
        // const data = await newStudentsignup.json();
        console.log(resp.data);

        // Store the user Detail 
        props.signInHandler();
    }

    return (
        <section className={classes.form}>
            <Card >
                <div className={classes['signup-form']}>
                    <h2>Sign Up</h2>
                    <form method='POST' onSubmit={memberFormSignUpHandler}>
                        <input type="text" name="fullname" placeholder="User Name" ref={nameInputRef} pattern=".{4,}" title="Username must be at least 4 characters long" required></input>
                        <input type="email" name="email" placeholder="Email" ref={emailInputRef} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="Please enter a valid email address in the format user@example.com" required></input>
                        <input type="password" name="password" placeholder="Create-Password" ref={passwordInputRef} pattern=".{8,}" title="Password must be at least 8 characters long" required></input>
                        {/* <input type="tel" name="number" placeholder="Phone-Number" ref={numberInputRef} pattern="[0-9]{10}" title="Please enter your 10 digit number " required ></input> */}
                        <input type="password" name="code" placeholder="Authentic-Member-Code" ref={codeInputRef} required></input>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className={classes.para}>
                    <p>Already have an account? <button className={classes.buttonSubmit} type='button' onClick={props.signInHandler}>Sign In</button></p>
                </div>
            </Card>
        </section>
    );
};

export default MemberSignUp;