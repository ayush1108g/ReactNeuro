import React, { useState } from "react";
import StudentSignIn from "./StudentSignin";
import StudentSignUp from "./StudentSignup";
import classes from './StudentLogin.module.css'

const StudentLogin = (props) => {
    const [signUpState, setSignUpState] = useState(true);
    const [signInState, setSignInState] = useState(false);

    const signInHandler = () => {
        setSignUpState(false);
        setSignInState(true);
    }
    const signUpHandler = () => {
        setSignUpState(true);
        setSignInState(false);
    }

    return (
        <React.Fragment>
            <div className={classes.btnbody}>
                <button className={classes['back-button']} onClick={props.backHandler} >Back</button>
            </div>
            {signUpState && <StudentSignUp signInHandler={signInHandler} />}
            {signInState && <StudentSignIn onLogin={props.onLogin} signUpHandler={signUpHandler} studentSignInFormSubmit={props.studentSignInFormSubmit} />}
        </React.Fragment>
    );
};

export default StudentLogin;