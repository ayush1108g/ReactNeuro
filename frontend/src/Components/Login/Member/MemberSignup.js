import React, { useRef, useState } from 'react';
import Card from '../../UI/Card';
import classes from './MemberSignup.module.css'
import axios from 'axios';
import { ToLink } from '../../Contents/Main';

const MemberSignUp = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errormsg, setErrormsg] = useState("");

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const codeInputRef = useRef();

    const memberFormSignUpHandler = async (event) => {
        event.preventDefault();
        const userDetail = ({
            userName: nameInputRef.current.value,
            userEmail: emailInputRef.current.value,
            userPassword: passwordInputRef.current.value,
            authenticationCode: codeInputRef.current.value,
        });


      //  console.log(userDetail);

        const options = {
            headers: {
                "mentor-signup": "application/json",
            },
        };
        const body = {
            name: userDetail.userName,
            emailid: userDetail.userEmail,

            password: userDetail.userPassword,
            code: userDetail.authenticationCode,
        };
        try {
            setIsLoading(true);
            const resp = await axios.post(`${ToLink}/mentor/signup`, body, options, { timeout: 20000 });
            //console.log(resp.data);

            if (resp.status === 201) {
                nameInputRef.current.value = '';
                emailInputRef.current.value = '';
                passwordInputRef.current.value = '';
                codeInputRef.current.value = '';
                props.signInHandler();
            }
        }
        catch (error) {
            // console.log(error);
            if (error.code === "ERR_BAD_REQUEST")
                setErrormsg('Email already in use');
            else if (error.code === "ERR_BAD_RESPONSE")
                setErrormsg('Server Not Responding...')
            else
                setErrormsg("An error occurred. Please try again.");
        }
        setIsLoading(false);
    }

    return (
        <section className={classes.form}>
            <Card >
                <div>
                    {!isLoading && <p className={classes.loading}> {errormsg}</p>}
                    {
                        isLoading && <section >
                            <p className={classes.loading}>Loading...</p>
                        </section>
                    }
                </div>
                <div className={classes['signup-form']}>
                    <h2>Sign Up</h2>
                    <form method='POST' onSubmit={memberFormSignUpHandler}>
                        <input type="text" name="fullname" placeholder="User Name" ref={nameInputRef} pattern=".{4,}" title="Username must be at least 4 characters long" required></input>
                        <input type="email" name="email" placeholder="Email" ref={emailInputRef} title="Please enter a valid email address in the format user@example.com" required></input>
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